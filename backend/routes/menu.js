const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// GET all
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create (admin)
router.post("/", async (req, res) => {
  try {
    const created = await MenuItem.create(req.body);
    res.json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
