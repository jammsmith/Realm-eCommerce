const faker = require('faker');

const categories = require('../data/categories.js');

const generateCategories = () => {
  const generatedCategories = [];

  categories.map(category => {
    const item = {
      name: category.name,
      description: faker.commerce.productDescription(),
      image: 'https://placedog.net/350?random'
    };
    generatedCategories.push(item);
  });

  return generatedCategories;
};

module.exports = generateCategories;
