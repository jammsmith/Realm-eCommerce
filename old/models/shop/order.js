const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  customerId: { type: String, required: true },
  extraInfo: String,
  isPendingInCheckout: { type: Boolean, required: true, default: true },
  isPaidFor: { type: Boolean, required: true, default: false },
  isOrderConfirmed: { type: Boolean, required: true, default: false },
  isDelivered: { type: Boolean, required: true, default: false }
});

module.exports = model('Order', orderSchema);
