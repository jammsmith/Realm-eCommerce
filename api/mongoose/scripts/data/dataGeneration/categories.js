const { faker } = require('@faker-js/faker');

const categories = require('../sampleData/categories.js');
const subCategories = require('../sampleData/subCategories.js');

const generateCategories = () => {
  const generatedCategories = categories.map(category => {
    const subCategoriesInCategory = subCategories.filter(item => item.category === category.name);
    const subCategoryIds = subCategoriesInCategory.map(item => item.subCategory_id);

    return {
      name: category.name,
      description: faker.commerce.productDescription(),
      image: 'https://placekitten.com/350?random',
      subCategories: subCategoryIds
    };
  });
  return generatedCategories;
};

module.exports = generateCategories;
