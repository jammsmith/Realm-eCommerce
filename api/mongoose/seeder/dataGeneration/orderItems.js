const faker = require('faker');

const generateOrderItems = (users, products) => {
  const generatedItems = [];

  const sizeOptions = ['S', 'M', 'L', 'XL'];
  const quantityOptions = [1, 2, 3];

  for (let i = 0; i < 100; i++) {
    const randomProduct = faker.random.arrayElement(products);
    const randomUser = faker.random.arrayElement(users);

    generatedItems.push({
      orderItem_id: `000${i}`,
      size: faker.random.arrayElement(sizeOptions),
      quantity: faker.random.arrayElement(quantityOptions),
      product: randomProduct.product_id,
      customer: randomUser.user_id
    });
  }
  return generatedItems;
};

module.exports = generateOrderItems;
