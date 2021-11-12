const users = require('./data/users.js');
const faker = require('faker');

const generateUsers = (orders) => {
  const generatedUsers = users.map(user => {
    const randomOrders = [];
    for (let i = 0; i < 5; i++) {
      const randomOrder = faker.random.arrayElement(orders);
      randomOrders.push(randomOrder.order_id);
    }
    user.orders = randomOrders;
    return user;
  });
  return generatedUsers;
};

module.exports = generateUsers;
