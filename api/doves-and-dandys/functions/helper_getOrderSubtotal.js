exports = async (orderItems, currency) => {
  try {
    // Get prices for products and return total to pay
    const products = context.services
      .get('mongodb-atlas')
      .db('dovesAndDandysDB')
      .collection('products');

    const pricesPromise = orderItems.map(async item => {
      const product = await products.findOne({ _id: BSON.ObjectId(item.product._id) });
      const priceInCurrency = product[`price${currency}`];

      return priceInCurrency * item.quantity;
    });
    const prices = await Promise.all(pricesPromise);

    const reducer = (a, b) => a + b;
    const orderTotal = prices.reduce(reducer);
    console.log('orderTotal', orderTotal);

    return orderTotal;
  } catch (err) {
    console.log('Failed to get order subtotal. Error:', err);
    return null;
  }
};
