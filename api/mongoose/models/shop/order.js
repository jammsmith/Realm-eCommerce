const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  order_id: { type: String, required: true },
  extraInfo: String,
  orderItems: { type: [String], required: true },
  status: { type: String, required: true, default: 'pendingInCheckout' },
  paymentIntentId: String
});

module.exports = model('Order', orderSchema);
