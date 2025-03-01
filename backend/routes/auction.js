const express = require('express');
const Auction = require('../models/Auction');
const auth = require('../middleware/auth'); // Correct path to auth middleware
const User = require('../models/User');

const router = express.Router();

// Create a new auction
router.post('/', auth, async (req, res) => {
  const { title, description, startingBid } = req.body;

  try {
    const auction = new Auction({
      title,
      description,
      startingBid,
      seller: req.user.id,
      currentBid: startingBid,
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Auction ends in 7 days
    });

    await auction.save();
    res.status(201).json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get auction details
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ msg: 'Auction not found' });
    res.json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Place a bid on an auction
router.post('/:id/bid', auth, async (req, res) => {
  const { bidAmount } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (user.userType !== 'buyer') {
      return res.status(403).json({ msg: 'Only buyers can place bids' });
    }

    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ msg: 'Auction not found' });

    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({ msg: 'Bid must be higher than current bid' });
    }

    auction.currentBid = bidAmount;
    await auction.save();
    res.json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;