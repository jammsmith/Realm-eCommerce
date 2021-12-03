const faker = require('faker');
const _ = require('lodash');
const categories = require('../data/categories.js');

const generateProducts = () => {
  const generatedProducts = [];

  for (let i = 1; i < 50; i++) {
    const numInStockOptions = [0, 1, 2, 3];

    // Returns an array of category names.
    const categoryArray = categories.map(c => c.name);

    // Returns a single category from the above array.
    const randomCategory = faker.random.arrayElement(categoryArray);

    // Returns an object containing the category name and array of sub-categories from the above category.
    const currentCategory = _.find(categories, { name: randomCategory });

    // Returns a single sub-category from the sub-category array of the above object.
    const randomSubCategory = faker.random.arrayElement(currentCategory.subCategories);

    generatedProducts.push({
      product_id: `product-00${i}`,
      name: faker.commerce.productName(),
      image: 'https://placedog.net/350?random',
      category: randomCategory,
      subCategory: randomSubCategory,
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      numInStock: faker.random.arrayElement(numInStockOptions)
    });
  }

  return generatedProducts;
};

module.exports = generateProducts;
