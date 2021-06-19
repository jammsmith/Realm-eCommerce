const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const customerSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  isAdmin: { type: Boolean, default: false }
});

const Customer = model('Customer', customerSchema);

module.exports = {
  Customer,
  customerSchema
};
