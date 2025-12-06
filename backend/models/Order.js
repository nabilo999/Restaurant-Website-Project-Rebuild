const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  items: [{ menuItemId: String, name: String, qty: Number, price: Number }],
  total: Number,
  customer: {
    name: String,
    phone: String,
    address: String
  },
  status: { type: String, default: "received" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Order", OrderSchema);
