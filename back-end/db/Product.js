const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  userId: String,
});

module.exports = mongoose.model("products", productSchema);
