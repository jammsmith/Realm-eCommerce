const faker = require('faker');

const generateOrderItems = (orders, products) => {
  const generatedItems = [];

  const sizeOptions = ['S', 'M', 'L', 'XL'];
  const quantityOptions = [1, 2, 3];
  const orderIdArray = orders.map(order => order._id);
  const productIdArray = products.map(product => product._id);

  for (let i = 0; i < 100; i++) {
    generatedItems.push({
      size: faker.random.arrayElement(sizeOptions),
      quantity: faker.random.arrayElement(quantityOptions),
      orderId: faker.random.arrayElement(orderIdArray),
      productId: faker.random.arrayElement(productIdArray)
    });
  }
  return generatedItems;
};

module.exports = generateOrderItems;
