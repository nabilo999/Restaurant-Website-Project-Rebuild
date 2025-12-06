const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  cartId: { type: String, required: true, unique: true },
  items: [{ menuItemId: String, name: String, qty: Number, price: Number }],
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Cart", CartSchema);
