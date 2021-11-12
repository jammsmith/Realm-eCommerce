const subCategories = require('../data/subCategories.js');
const faker = require('faker');

const generateSubCategories = (products) => {
  const generatedSubCategories = subCategories.map(subCategory => {
    const randomProducts = [];
    for (let i = 0; i < 10; i++) {
      const randomProduct = faker.random.arrayElement(products);
      randomProducts.push(randomProduct.product_id);
    }
    subCategory.products = randomProducts;
    return subCategory;
  });
  return generatedSubCategories;
};

module.exports = generateSubCategories;
