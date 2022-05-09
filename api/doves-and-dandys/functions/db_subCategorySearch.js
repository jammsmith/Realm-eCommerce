exports = async (name) => {
  const subCategories = context.services
    .get('mongodb-atlas')
    .db('dovesAndDandysDB')
    .collection('subcategories');

  const searchParams = name ? { name: { $regex: name, $options: '$i' } } : {};
  // find all products that contain the name input regardless of capitalisation
  const searchResults = await subCategories.find(searchParams).toArray();

  return JSON.parse(JSON.stringify(searchResults));
};
