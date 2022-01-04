exports = async (order) => {
  /** Mongodb Realm has an ongoing problem with the stripe SDK which makes it run VERY slowly.
  Using Axios instead to perform POST request. **/

  const axios = require('axios');
  const qs = require('qs');
  const secretKey = context.values.get('STRIPE_SK_TEST');

  let purchaseData = {
    amount: 2000,
    currency: 'gbp'
  };
  purchaseData = qs.stringify(purchaseData);

  try {
    const paymentIntent =
      await axios.post(
        'https://api.stripe.com/v1/payment_intents',
        purchaseData,
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
