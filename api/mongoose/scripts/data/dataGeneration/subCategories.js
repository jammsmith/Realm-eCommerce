const { faker } = require('@faker-js/faker');

const subCategories = require('../sampleData/subCategories.js');

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
