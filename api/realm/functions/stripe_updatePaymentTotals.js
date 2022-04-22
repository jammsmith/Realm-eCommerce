exports = async (paymentIntentId, orderItems, deliveryZone, currency, freeDeliveryConstraints) => {
  /** Mongodb Realm has an ongoing problem with the stripe SDK which makes it run VERY slowly.
  Using Axios instead to perform stripe requests. **/
  const axios = require('axios');
  const qs = require('qs');

  const secretKey = context.values.get('STRIPE_SK_TEST');

  try {
    // get delivery price and subtotal by currency
    const amounts = await Promise.all([
      context.functions.execute('helper_getOrderSubtotal', orderItems, currency),
      context.functions.execute('helper_getDeliveryPrice', orderItems, deliveryZone, currency)
    ]);
    const subtotal = amounts[0];
    const deliveryTotal = amounts[1];
    console.log('Items subtotal:', subtotal);
    console.log('Delivery amount:', deliveryTotal);

    const deliveryIsFree = subtotal >= freeDeliveryConstraints[currency];

    const orderTotal = deliveryIsFree
      ? subtotal
      : subtotal + deliveryTotal;
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
      orderSubtotal: subtotal,
      deliveryTotal: !deliveryIsFree ? deliveryTotal : 0
    };
  } catch (err) {
    console.log('Realm function error -> getPaymentIntent.', err);
  }
};
