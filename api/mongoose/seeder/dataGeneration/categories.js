const faker = require('faker');

const categories = require('../data/categories.js');
const subCategories = require('../data/subCategories.js');

const generateCategories = () => {
  const generatedCategories = categories.map(category => {
    const subCategoriesInCategory = subCategories.filter(item => item.category === category.name);
    const subCategoryIds = subCategoriesInCategory.map(item => item.subCategory_id);

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
