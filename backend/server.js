require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// routes
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");
const cartsRoutes = require("./routes/carts");

app.use("/api/menu", menuRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/carts", cartsRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
})
.catch(err => {
  console.error("MongoDB connection error:", err);
});
