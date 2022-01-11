exports = async (payload, response) => {
  // Convert the webhook body from BSON to an EJSON object
  const event = EJSON.parse(payload.body.text());
  const paymentIntent = event.data.object;

  //
  const orders = context.services.get('mongodb-atlas').db('dovesAndDandysDB').collection('orders');

  const updateOrderStatus = async (options) => {
    await orders.updateOne(
      { paymentIntentId: paymentIntent.id },
      { $set: options }
    );
  };

  const handlePaymentSucceeded = async () => {
    await updateOrderStatus({
      orderStatus: 'awaitingConfirmation',
      paymentStatus: 'successful',
      datePaid: new Date(Date.now())
    });
    // add google analytics sales
    // send confirmation email
    // send order notification to admin
  };
  const handlePaymentFailed = async () => {
    await updateOrderStatus({
      paymentStatus: 'failed'
    });
  };

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('payment_intent.succeeded');
      handlePaymentSucceeded();
      break;
    case 'payment_intent.payment_failed':
      console.log('payment_intent.payment_failed');
      handlePaymentFailed();
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.statusCode = 200;
};
