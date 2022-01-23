const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const deliveryAddressSchema = new Schema({
  address_id: { type: String, required: true },
  user: { type: String, required: true },
  addressPart1: { type: String, required: true },
  addressPart2: { type: String, required: true },
  postcode: { type: String, required: true },
  country: { type: String, required: true }
});

module.exports = model('DeliveryAddress', deliveryAddressSchema);
