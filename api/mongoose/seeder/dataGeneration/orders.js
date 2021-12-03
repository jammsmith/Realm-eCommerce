const faker = require('faker');
const orderBooleans = require('../data/orderBooleans.js');

const generateOrders = (orderItems) => {
  const generatedOrders = [];

  // Randomize between adding extra info and leaving null
  const hasExtraInfo = faker.datatype.boolean();
  let randomExtraInfo = null;

  if (hasExtraInfo) {
    randomExtraInfo = faker.lorem.paragraph();
  }

  // An object of booleans to be added to the order object
  const randomBooleanValues = faker.random.arrayElement(orderBooleans);

  // Generate orders
  for (let i = 1; i < 20; i++) {
    const randomOrderItems = [];
    for (let i = 0; i < 3; i++) {
      randomOrderItems.push(faker.random.arrayElement(orderItems).orderItem_id);
    }
    const objSection1 = {
      order_id: `order-00${i}`,
      extraInfo: randomExtraInfo,
      orderItems: randomOrderItems
    };
    generatedOrders.push({
      ...objSection1,
      ...randomBooleanValues
    });
  }
  return generatedOrders;
};

module.exports = generateOrders;
