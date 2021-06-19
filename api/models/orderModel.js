const mongoose = require('mongoose');

const { customerSchema } = require('./customerModel.js');
const { productSchema } = require('./productModel.js');

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  product: productSchema,
  customer: customerSchema,
  quantity: { type: Number, required: true },
  size: String,
  extraInfo: String,
  paymentProcessedSuccess: { type: Boolean, required: true, default: false }
});

const Order = model('Order', orderSchema);

module.exports = {
  Order,
  orderSchema
};
