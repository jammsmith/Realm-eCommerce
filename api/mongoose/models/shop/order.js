const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  order_id: { type: String, required: true },
  extraInfo: String,
  orderItems: { type: [String], required: true },
  paymentIntentId: String,
  orderStatus: { type: String, required: true, default: 'pendingInCheckout' },
  paymentStatus: { type: String, required: true, default: 'notPaid' },
  dateCreated: { type: String, required: true },
  datePaid: String,
  dateRefunded: String,
  dateSent: String,
  dateReceived: String,
  deliveryAddress: String
});

module.exports = model('Order', orderSchema);
