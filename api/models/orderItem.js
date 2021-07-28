const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const OrderItemSchema = new Schema({
  size: String,
  quantity: { type: Number, required: true },
  userId: { type: String, required: true },
  orderId: { type: String, required: true },
  productId: { type: String, required: true }
});

module.exports = model('OrderItem', OrderItemSchema);
