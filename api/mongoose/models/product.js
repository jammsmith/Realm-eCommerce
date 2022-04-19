const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productSchema = new Schema({
  product_id: { type: String, required: true },
  name: { type: String, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  description: { type: String, required: true },
  priceGBP: { type: Number, required: true },
  priceUSD: { type: Number, required: true },
  priceEUR: { type: Number, required: true },
  numInStock: { type: Number, required: true, default: 0 }
});

module.exports = model('Product', productSchema);
