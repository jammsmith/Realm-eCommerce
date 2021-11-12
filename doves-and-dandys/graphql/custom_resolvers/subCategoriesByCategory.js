const db = require('../../mongoose/client.js');
const SubCategory = require('../../mongoose/models/shop/subCategory.js');

module.exports = async (category) => {
  db();
  const subCategories = await SubCategory.find({ category: category.name });
  return subCategories;
};
