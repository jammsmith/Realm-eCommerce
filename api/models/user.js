const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false }
});

module.exports = model('User', userSchema);
