const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  type: { type: String, required: true, default: 'GUEST' }
});

module.exports = model('User', userSchema);
