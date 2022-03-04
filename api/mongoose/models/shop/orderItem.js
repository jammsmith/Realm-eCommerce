const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
  orderItem_id: { type: String, required: true },
  size: String,
  quantity: { type: Number, required: true },
  product: { type: String, required: true }
});

module.exports = model('OrderItem', orderItemSchema);
