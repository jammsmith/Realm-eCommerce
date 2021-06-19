const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String },
  image: { type: String },
  description: { type: String },
  price: { type: Number },
  numInStock: { type: Number, default: 0 }
});

const Product = model('Product', productSchema);

module.exports = {
  Product,
  productSchema
};
