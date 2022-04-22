exports = async (orderItems, currency) => {
  try {
    // Get prices for products and return total to pay
    const products = context.services
      .get('mongodb-atlas')
      .db('dovesAndDandysDB')
      .collection('products');

    const pricesPromise = orderItems.map(async item => {
      const product = await products.findOne({ _id: BSON.ObjectId(item.product._id) });
      return product[`price${currency}`];
    });
    const prices = await Promise.all(pricesPromise);

    const reducer = (a, b) => a + b;
    const orderTotal = prices.reduce(reducer);

    return orderTotal;
  } catch (err) {
    console.log('Failed to get order subtotal. Error:', err);
    return null;
  }
};
