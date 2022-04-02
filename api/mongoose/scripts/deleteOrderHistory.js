const {
  Address,
  Delivery,
  Order,
  OrderItem,
  Refund
} = require('../models');
const mongooseConnection = require('../client.js');

mongooseConnection();

(async () => {
  try {
    await Address.deleteMany();
    await Delivery.deleteMany();
    await Order.deleteMany();
    await OrderItem.deleteMany();
    await Refund.deleteMany();

    console.log('Data deletion successful.');
    process.exit(0);
  } catch (err) {
    console.error(`Data deletion failed: ${err}`);
    process.exit(0);
  }
})();
