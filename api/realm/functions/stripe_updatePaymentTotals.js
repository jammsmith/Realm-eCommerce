exports = async (paymentIntentId, orderItems, deliveryZone, currency) => {
  /** Mongodb Realm has an ongoing problem with the stripe SDK which makes it run VERY slowly.
  Using Axios instead to perform stripe requests. **/
  const axios = require('axios');
  const qs = require('qs');

  const secretKey = context.values.get('STRIPE_SK_TEST');

  try {
    // get delivery price and subtotal by currency
    const amounts = await Promise.all([
      context.functions.execute('helper_getDeliveryPrice', orderItems, deliveryZone, currency),
      context.functions.execute('helper_getOrderSubtotal', orderItems, currency)
    ]);
    console.log('Delivery amount:', amounts[0]);
    console.log('Items subtotal:', amounts[1]);

    const orderTotal = amounts[0] + amounts[1];
    console.log(`Order total in currency: ${currency}${orderTotal}`);
    console.log(`Stripe amount: ${orderTotal * 100}`);

    const stringifiedData = qs.stringify({
      amount: orderTotal * 100,
      currency: currency.toLowerCase()
    });

    const paymentIntent = await axios.post(
      `https://api.stripe.com/v1/payment_intents/${paymentIntentId}`,
      stringifiedData,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`
        }
      }
    );
    return {
      paymentIntent: paymentIntent.data,
      deliveryTotal: amounts[0],
      orderSubtotal: amounts[1]
    };
  } catch (err) {
    console.log('Realm function error -> getPaymentIntent.', err);
  }
};
