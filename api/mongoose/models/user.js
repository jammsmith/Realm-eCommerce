const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  user_id: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  type: { type: String, required: true, default: 'guest' },
  orders: [String]
});

module.exports = model('User', userSchema);
