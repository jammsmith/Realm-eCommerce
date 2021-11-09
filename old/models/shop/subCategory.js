const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const subCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
});

module.exports = model('SubCategory', subCategorySchema);
