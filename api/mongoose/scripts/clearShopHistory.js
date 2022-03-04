const User = require('../models/user.js');
const Order = require('../models/shop/order.js');
const OrderItem = require('../models/shop/orderItem.js');
const Delivery = require('../models/shop/delivery.js');
const Address = require('../models/shop/address.js');

const mongooseConnection = require('../client.js');
mongooseConnection();

(async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await OrderItem.deleteMany();
    await Delivery.deleteMany();
    await Address.deleteMany();

    console.log('Data deletion successful.');
    process.exit(0);
  } catch (err) {
    console.error(`Data deletion failed: ${err}`);
    process.exit(0);
  }
})();
