const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create order
router.post("/", async (req, res) => {
  try {
    const { items, total, customer } = req.body;
    const newOrder = await Order.create({ items, total, customer });
    res.json({ message: "Order saved", orderId: newOrder._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all (admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
