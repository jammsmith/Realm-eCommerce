exports = async (paymentIntentId, update) => {
  /** Mongodb Realm has an ongoing problem with the stripe SDK which makes it run VERY slowly.
  Using Axios instead to perform stripe requests. **/
  const axios = require('axios');
  const qs = require('qs');

  const secretKey = context.values.get('STRIPE_SK_TEST');

  const stringifiedData = qs.stringify(update);

  try {
    const paymentIntent = await axios.post(
      `https://api.stripe.com/v1/payment_intents/${paymentIntentId}`,
      stringifiedData,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`
        }
      }
    );
    return paymentIntent.data;
  } catch (err) {
    console.log('Realm function error -> getPaymentIntent. Error:', err);
  }
};
