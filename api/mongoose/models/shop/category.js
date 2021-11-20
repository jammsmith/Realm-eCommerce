const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  subCategories: { type: [String], required: true }
});

module.exports = model('Category', categorySchema);