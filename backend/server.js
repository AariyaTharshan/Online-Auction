const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

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
}));

// Auction Schema
const Auction = mongoose.model("Auction", new mongoose.Schema({
  title: String,
  description: String,
  startingPrice: Number,
  image: String,
  seller: mongoose.Schema.Types.ObjectId,
  bids: [{ buyer: mongoose.Schema.Types.ObjectId, amount: Number }],
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
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token, user });
});

app.get("/user/:id", authenticate, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.put("/user/:id", authenticate, upload.single("profileImage"), async (req, res) => {
  const { name, email, password } = req.body;
  const updatedData = { name, email };
  if (password) updatedData.password = await bcrypt.hash(password, 10);
  if (req.file) updatedData.profileImage = `/uploads/${req.file.filename}`;
  
  const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "Profile updated successfully", user });
});

app.post("/create-auction", authenticate, upload.single("image"), async (req, res) => {
  const { title, description, startingPrice } = req.body;
  const auction = new Auction({
    title,
    description,
    startingPrice,
    image: req.file ? `/uploads/${req.file.filename}` : "",
    seller: req.user.id,
  });
  await auction.save();
  res.json({ message: "Auction created successfully", auction });
});

app.get("/auctions", async (req, res) => {
  const auctions = await Auction.find();
  res.json(auctions);
});

app.get("/auction/:id", async (req, res) => {
  const auction = await Auction.findById(req.params.id);
  if (!auction) return res.status(404).json({ message: "Auction not found" });
  res.json(auction);
});

app.post("/bid", authenticate, async (req, res) => {
  const { auctionId, amount } = req.body;
  const auction = await Auction.findById(auctionId);
  if (!auction) return res.status(404).json({ message: "Auction not found" });
  auction.bids.push({ buyer: req.user.id, amount });
  await auction.save();
  res.json({ message: "Bid placed successfully", auction });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
