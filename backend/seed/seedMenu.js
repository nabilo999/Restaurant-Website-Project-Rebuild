const mongoose = require("mongoose");
const MenuItem = require("../models/MenuItem");

mongoose.connect("mongodb://127.0.0.1:27017/restaurant");

const items = [
  { name: "Pancakes with Syrup", price: 7, description: "Breakfast item" },
  { name: "French Toast", price: 8, description: "Breakfast item" },
  { name: "Omelette with Cheese", price: 9, description: "Breakfast item" },

  { name: "Classic Cheeseburger", price: 11, description: "Main course" },
  { name: "Grilled Chicken Sandwich", price: 10, description: "Main course" },
  { name: "Meatloaf with Mashed Potatoes", price: 13, description: "Main course" },

  { name: "Apple Pie", price: 5, description: "Dessert" },
  { name: "Milkshake", price: 6, description: "Dessert" },
  { name: "Ice Cream Sundae", price: 5, description: "Dessert" }
];

async function seed() {
  try {
    await MenuItem.deleteMany();
    await MenuItem.insertMany(items);
    console.log("Menu Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
