const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// get cart
router.get("/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartId: req.params.cartId });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create/update cart (upsert)
router.post("/", async (req, res) => {
  try {
    const { cartId, items } = req.body;
    const updated = await Cart.findOneAndUpdate(
      { cartId },
      { items, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete cart
router.delete("/:cartId", async (req, res) => {
  try {
    await Cart.findOneAndDelete({ cartId: req.params.cartId });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
