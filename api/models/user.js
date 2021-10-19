const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, required: true, default: false }
});

module.exports = model('User', userSchema);
