const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { Customer } = require('../models/customerModel.js');
const { Product } = require('../models/productModel.js');
const { Order } = require('../models/orderModel.js');

const products = require('./data/products.js');
const customers = require('./data/customers.js');

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
    await Customer.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    await Customer.insertMany(customers);
    console.log('Fake customer data imported successfully');

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
    await Customer.deleteMany();
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
