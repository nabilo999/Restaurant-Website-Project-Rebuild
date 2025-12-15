require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve React static files from the build directory
const buildPath = path.join(__dirname, "../build");
console.log("Serving static files from:", buildPath);
app.use(express.static(buildPath));

// routes
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");
const cartsRoutes = require("./routes/Carts");

app.use("/api/menu", menuRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/carts", cartsRoutes);

// Catch-all route: serve React app for all other routes
app.use((req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
})
.catch(err => {
  console.error("MongoDB connection error:", err);
});
