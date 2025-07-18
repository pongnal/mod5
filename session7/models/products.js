const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    inStock: { type: Boolean, default: true }
  });
  
  module.exports = mongoose.model("Product", productSchema);