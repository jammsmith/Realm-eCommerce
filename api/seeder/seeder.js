const createMongooseConnection = require('../helpers/createMongooseConnection.js');

const User = require('../models/user.js');
const Category = require('../models/shop/category.js');
const SubCategory = require('../models/shop/subCategory');
const Product = require('../models/shop/product.js');
const Order = require('../models/shop/order.js');
const OrderItem = require('../models/shop/orderItem.js');

const users = require('./data/users.js');
const subCategories = require('./data/subCategories.js');
const generateCategories = require('./dataGeneration/categories.js');
const generateProducts = require('./dataGeneration/products.js');
const generateOrders = require('./dataGeneration/orders.js');
const generateOrderItems = require('./dataGeneration/orderItems.js');

createMongooseConnection();

//
const addFakeData = async () => {
  try {
    // Delete any existing data
    await User.deleteMany();
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await OrderItem.deleteMany();

    // Add customer/user data
    await User.insertMany(users);
    console.log('Users added successfully.');

    // Add shop stock data
    const categories = generateCategories();
    const products = generateProducts();
    await Category.insertMany(categories);
    console.log('Categories added successfully.');
    await SubCategory.insertMany(subCategories);
    console.log('Sub-categories added successfully.');
    await Product.insertMany(products);
    console.log('Products added successfully.');

    // Add orders based on above data
    const usersFromDb = await User.find({});
    const orders = generateOrders(usersFromDb);
    await Order.insertMany(orders);
    console.log('Orders added successfully.');

    // Add items to order based on above data
    const ordersFromDB = await Order.find({});
    const productsFromDB = await Product.find({});
    const orderItems = generateOrderItems(ordersFromDB, productsFromDB);
    await OrderItem.insertMany(orderItems);
    console.log('Order items added successfully.');

    console.log('Seed completed successfully.');
    process.exit(0).then();
  } catch (err) {
    console.error(`Fake data import failed: ${err}`);
    process.exit(1);
  }
};

const deleteAllData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await OrderItem.deleteMany();

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
