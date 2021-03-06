const { faker } = require('@faker-js/faker');
const _ = require('lodash');

const categories = require('../sampleData/categories.js');

const generateProducts = () => {
  const generatedProducts = [];

  for (let i = 1; i < 231; i++) {
    const numInStockOptions = [0, 1, 2, 3];

    // Returns an array of category names.
    const categoryArray = categories.map(c => c.name);

    // Returns a single category from the above array.
    const randomCategory = faker.random.arrayElement(categoryArray);

    // Returns an object containing the category name and array of sub-categories from the above category.
    const currentCategory = _.find(categories, { name: randomCategory });

    // Returns a single sub-category from the sub-category array of the above object.
    const randomSubCategory = faker.random.arrayElement(currentCategory.subCategories);

    // Returns a random number (1-5) of images
    const images = [];
    const numberBetweenOneAndFive = Math.ceil(Math.random() * 5);
    const image = 'https://via.placeholder.com/300';
    for (let i = 0; i < numberBetweenOneAndFive; i++) {
      images.push(image);
    }

    const weightOptions = [50, 100, 200, 500, 1500, 2500];

    generatedProducts.push({
      product_id: `product-00${i}`,
      name: faker.commerce.productName(),
      images: images,
      category: randomCategory,
      subCategory: randomSubCategory,
      description: faker.commerce.productDescription(),
      priceGBP: faker.commerce.price(),
      priceUSD: faker.commerce.price(),
      priceEUR: faker.commerce.price(),
      numInStock: faker.random.arrayElement(numInStockOptions),
      weightInGrams: faker.random.arrayElement(weightOptions)
    });
  }

  return generatedProducts;
};

module.exports = generateProducts;
