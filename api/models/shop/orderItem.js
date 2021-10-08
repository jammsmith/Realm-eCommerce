const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
  size: String,
  quantity: { type: Number, required: true },
  orderId: { type: String, required: true },
  productId: { type: String, required: true }
});

module.exports = model('OrderItem', orderItemSchema);
