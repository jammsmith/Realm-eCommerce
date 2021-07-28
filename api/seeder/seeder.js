const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('../models/user.js');
const Product = require('../models/product.js');
const Order = require('../models/orderItem.js');

const products = require('./data/products.js');
const users = require('./data/users.js');

dotenv.config();

const { MONGO_CONNECTION_URI } = process.env;

mongoose
  .connect(MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log('Connected with dovesAndDandysDB'));

//
const addFakeData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    await User.insertMany(users);
    console.log('Fake user data imported successfully');

    await Product.insertMany(products);
    console.log('Fake products imported successfully.');

    process.exit(0);
  } catch (err) {
    console.error(`Fake data import failed: ${err}`);
    process.exit(1);
  }
};

const deleteAllData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    console.log('Data deletion successful.');
    process.exit(0);
  } catch (err) {
    console.error(`Data deletion failed: ${err}`);
    process.exit(0);
  }
};

if (process.argv[2] === '-d') {
  deleteAllData();
} else {
  addFakeData();
}
