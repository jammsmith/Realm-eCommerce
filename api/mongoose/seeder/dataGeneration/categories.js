const faker = require('faker');

const categories = require('../data/categories.js');

const generateCategories = () => {
  const generatedCategories = categories.map(category => {
    const subCategoryIds = category.subCategories.map(subCategory => {
      return `${category.name}--${subCategory}`;
    });
    return {
      name: category.name,
      description: faker.commerce.productDescription(),
      image: 'https://placedog.net/350?random',
      subCategories: subCategoryIds
    };
  });
  return generatedCategories;
};

module.exports = generateCategories;
