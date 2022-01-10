import React, { useState, useEffect, useContext } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CircularProgress from '@mui/material/CircularProgress';

// Components
import PaymentForm from './PaymentForm.js';
import PaymentSummary from './PaymentSummary.js';

// Helpers/hooks
import useActiveOrder from '../../../../hooks/useActiveOrder.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';

const Checkout = ({ stripePromise }) => {
  const [activeOrder] = useActiveOrder();
  const [updateOrder] = useDDMutation(mutations.UpdateOrder);
  const app = useContext(RealmAppContext);
  const [paymentIntent, setPaymentIntent] = useState(null);

  // Get a new payment intent if one does not already exist, or retrieve the existing one if it does -->
  useEffect(() => {
    if (activeOrder && !activeOrder.paymentIntentId) {
      const getNewPaymentIntent = async () => {
        const intent = await app.currentUser.functions.createPaymentIntent(activeOrder);
        updateOrder({
          variables: {
            id: activeOrder._id,
            paymentIntentId: intent.id
          }
        });
        setPaymentIntent(intent);
      };
      getNewPaymentIntent();
    } else if (activeOrder && activeOrder.paymentIntentId) {
      const retrievePaymentIntent = async () => {
        const intent = await app.currentUser.functions.retrievePaymentIntent(activeOrder.paymentIntentId);
        setPaymentIntent(intent);
      };
      retrievePaymentIntent();
    }
  }, [activeOrder, app.currentUser]);

  return (
    paymentIntent
      ? <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.client_secret }}>
        <PaymentForm paymentIntent={paymentIntent} user={app.currentUser} />
        <PaymentSummary />
        </Elements>
      : <>
        <h2>Preparing your order</h2>
        <CircularProgress />
        </>
  );
};

export default Checkout;
