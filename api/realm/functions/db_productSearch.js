exports = async (name) => {
  const products = context.services
    .get('mongodb-atlas')
    .db('dovesAndDandysDB')
    .collection('products');

  const searchParams = name ? { name: { $regex: name, $options: '$i' } } : {};
  // find all products that contain the name input regardless of capitalisation
  const searchResults = await products.find(searchParams).toArray();

  return JSON.parse(JSON.stringify(searchResults));
};
