const faker = require('faker');
const orderBooleans = require('../data/orderBooleans.js');

const generateOrders = (users) => {
  const generatedOrders = [];

  // Array of ID's from all newly seeded users
  const userIdArray = users.map(user => user._id);

  // A MongoDB ID chosen from the above array
  const randomCustomerID = faker.random.arrayElement(userIdArray);

  // Randomize between adding extra info and leaving null
  const hasExtraInfo = faker.datatype.boolean();
  let randomExtraInfo = null;

  if (hasExtraInfo) {
    randomExtraInfo = faker.lorem.paragraph();
  }

  // An object of booleans to be added to the order object
  const randomBooleanValues = faker.random.arrayElement(orderBooleans);

  // Generate orders
  for (let i = 0; i < 20; i++) {
    const objSection1 = {
      customerId: randomCustomerID,
      extraInfo: randomExtraInfo
    };
    generatedOrders.push({
      ...objSection1,
      ...randomBooleanValues
    });
  }
  return generatedOrders;
};

module.exports = generateOrders;
