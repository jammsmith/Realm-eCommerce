const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user.js');
const mongooseConnection = require('./mongooseConnection.js');

dotenv.config();

const generateToken = (userId) => {
  return jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: '5000s' });
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    console.log('JWT token invalid or expired.');
  }
};

const getUserWithToken = async (token) => {
  await mongooseConnection();
  if (token && token !== null && token !== 'null' && token !== '') {
    const decoded = await verifyToken(token);
    const user = await User.findById(decoded.id);
    if (user) {
      return user;
    } else {
      console.log('JWT authentication failed.');
    }
  }
};

module.export = {
  generateToken,
  verifyToken,
  getUserWithToken
};
