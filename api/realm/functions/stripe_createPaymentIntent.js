exports = async (order) => {
  /** Mongodb Realm has an ongoing problem with the stripe SDK which makes it run VERY slowly.
  Using Axios instead to perform stripe requests. **/
  const axios = require('axios');
  const qs = require('qs');

  const secretKey = context.values.get('STRIPE_SK_TEST');

  // Get prices for products and make total to pay
  const products = context.services.get('mongodb-atlas').db('dovesAndDandysDB').collection('products');

  const pricesPromise = order.orderItems.map(async item => {
    const product = await products.findOne({ _id: BSON.ObjectId(item.product._id) });
    return product[`price${order.currency}`];
  });
  const prices = await Promise.all(pricesPromise);

  const reducer = (a, b) => a + b;
  const orderTotal = (prices.reduce(reducer)) * 100;

  const purchaseData = {
    amount: orderTotal,
    currency: order.currency.toLowerCase(),
    metadata: {
      order_id: order.order_id
    }
  };
  const stringifiedData = qs.stringify(purchaseData);

  try {
    const paymentIntent = await axios.post(
      'https://api.stripe.com/v1/payment_intents',
      stringifiedData,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          contentType: 'application/x-www-form-urlencoded'
        }
      }
    );
    return paymentIntent.data;
  } catch (err) {
    console.log('Realm function error -> getPaymentIntent. Error:', err);
  }
};
