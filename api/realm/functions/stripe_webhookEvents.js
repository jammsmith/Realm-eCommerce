exports = async (payload, response) => {
  // Convert the webhook body from BSON to an EJSON object
  const event = EJSON.parse(payload.body.text());

  // Handle payments
  const orders = context.services.get('mongodb-atlas').db('dovesAndDandysDB').collection('orders');
  const updateOrderStatus = async (options) => {
    await orders.updateOne(
      { paymentIntentId: event.data.object.id },
      { $set: options }
    );
  };

  const handlePaymentSucceeded = async () => {
    await updateOrderStatus({
      orderStatus: 'awaitingConfirmation',
      paymentStatus: 'successful',
      datePaid: new Date(Date.now()),
      stripeAmountPaid: event.data.object.amount
    });
    // send confirmation email
  };
  const handlePaymentFailed = async () => {
    await updateOrderStatus({
      paymentStatus: 'failed'
    });
  };

  // Handle refunds
  const handleRefundUpdated = async () => {
    const refunds = context.services.get('mongodb-atlas').db('dovesAndDandysDB').collection('refunds');
    const refund = event.data.object;

    await refunds.updateOne(
      { refund_id: refund.id },
      {
        $set: { status: refund.status }
      }
    );
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
    case 'charge.refunded':
    case 'charge.refund.updated':
      console.log('charge.refunded || charge.refund.updated');
      handleRefundUpdated();
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.statusCode = 200;
};
