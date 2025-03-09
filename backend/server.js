const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const fs = require('fs');

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add this before setting up multer
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Multer for Image Uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// User Schema
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profileImage: String,
  role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' }
}));

// Auction Schema
const Auction = mongoose.model("Auction", new mongoose.Schema({
  title: String,
  description: String,
  startingPrice: Number,
  image: String,
  seller: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  endDate: Date,
  bids: [{ 
    buyer: mongoose.Schema.Types.ObjectId, 
    amount: Number,
    timestamp: { type: Date, default: Date.now }
  }]
}));

// Middleware for Authentication
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Routes
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("Received signup request:", { name, email, role }); // Log received data
    
    // Validate role
    if (!['buyer', 'seller'].includes(role)) {
      console.log("Invalid role:", role);
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role // Explicitly set the role
    });

    await user.save();
    console.log("Created user:", { id: user._id, role: user.role });
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error during registration" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ 
      message: "Login successful", 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/user/:id", authenticate, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

app.put("/user/:id", authenticate, upload.single("profileImage"), async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }

    const { name, email, password } = req.body;
    const updatedData = { name, email };
    
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }
    if (req.file) {
      updatedData.profileImage = `/uploads/${req.file.filename}`;
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ 
      message: "Profile updated successfully", 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Add a function to check and close expired auctions
const checkAndCloseExpiredAuctions = async () => {
  try {
    const expiredAuctions = await Auction.find({
      status: 'active',
      endDate: { $lte: new Date() }
    });

    for (const auction of expiredAuctions) {
      // Find the highest bid
      const highestBid = auction.bids.reduce((prev, current) => 
        (prev.amount > current.amount) ? prev : current, 
        { amount: 0 }
      );

      // Update auction status
      auction.status = 'closed';
      auction.winner = highestBid.buyer || null;
      await auction.save();
    }

    // Clean up old closed auctions
    await cleanupClosedAuctions();
  } catch (err) {
    console.error('Error checking expired auctions:', err);
  }
};

// Run the check every minute
setInterval(checkAndCloseExpiredAuctions, 60000);

// Add this function to handle auction cleanup
const cleanupClosedAuctions = async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
    const result = await Auction.deleteMany({
      status: 'closed',
      endDate: { $lt: oneHourAgo }
    });
    console.log(`Cleaned up ${result.deletedCount} closed auctions`);
  } catch (err) {
    console.error('Error cleaning up auctions:', err);
  }
};

// Update create auction route to return full auction data
app.post("/create-auction", authenticate, upload.single("image"), async (req, res) => {
  try {
    const { title, description, startingPrice, endDate } = req.body;
    
    // Validate end date
    const endDateTime = new Date(endDate);
    if (endDateTime <= new Date()) {
      return res.status(400).json({ message: "End time must be in the future" });
    }

    const auction = new Auction({
      title,
      description,
      startingPrice,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      seller: req.user.id,
      endDate: endDateTime
    });
    
    await auction.save();

    // Populate seller info before sending response
    const populatedAuction = await Auction.findById(auction._id)
      .populate('seller', 'name email');

    res.json({ 
      message: "Auction created successfully", 
      auction: populatedAuction 
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating auction" });
  }
});

// Update get auctions route to filter out expired auctions
app.get("/auctions", async (req, res) => {
  try {
    await checkAndCloseExpiredAuctions(); // Check for expired auctions
    const auctions = await Auction.find()
      .populate('seller', 'name email')
      .populate('winner', 'name email');
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching auctions" });
  }
});

app.get("/auction/:id", async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  if (!auction) return res.status(404).json({ message: "Auction not found" });
  res.json(auction);
});

app.post("/bid", authenticate, async (req, res) => {
  try {
    const { auctionId, amount } = req.body;
    const auction = await Auction.findById(auctionId);
    
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    if (auction.status === 'closed') {
      return res.status(400).json({ message: "This auction is closed" });
    }

    if (auction.seller.toString() === req.user.id) {
      return res.status(403).json({ message: "Sellers cannot bid on their own auctions" });
    }

    // Check number of bids by this user
    const userBids = auction.bids.filter(bid => bid.buyer.toString() === req.user.id);
    if (userBids.length >= 3) {
      return res.status(400).json({ message: "You have reached the maximum number of bids (3) for this auction" });
    }

    // Check if new bid is higher than user's last bid
    if (userBids.length > 0) {
      const lastBid = Math.max(...userBids.map(bid => bid.amount));
      if (amount <= lastBid) {
        return res.status(400).json({ message: "Your new bid must be higher than your previous bid" });
      }
    }

    const highestBid = auction.bids.reduce((prev, current) => 
      (prev.amount > current.amount) ? prev : current, { amount: auction.startingPrice });

    if (amount <= highestBid.amount) {
      return res.status(400).json({ message: "Bid must be higher than current highest bid" });
    }

    auction.bids.push({ buyer: req.user.id, amount });
    await auction.save();
    
    res.json({ message: "Bid placed successfully", auction });
  } catch (err) {
    res.status(500).json({ message: "Error placing bid" });
  }
});

app.post("/auction/:id/close", authenticate, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Check if user is the seller
    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the seller can close this auction" });
    }

    // Find the highest bid
    const highestBid = auction.bids.reduce((prev, current) => 
      (prev.amount > current.amount) ? prev : current, { amount: 0 });

    auction.status = 'closed';
    auction.winner = highestBid.buyer || null;
    await auction.save();

    res.json({ message: "Auction closed successfully", auction });
  } catch (err) {
    res.status(500).json({ message: "Error closing auction" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
