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
  const [stripeTransactionHasCompleted, setStripeTransactionHasCompleted] = useState(false);

  // Get a new payment intent if one does not already exist, or retrieve the existing one if it does -->
  useEffect(() => {
    if (activeOrder && !activeOrder.paymentIntentId) {
      const createPaymentIntent = async () => {
        const intent = await app.currentUser.functions.createPaymentIntent(activeOrder);
        updateOrder({
          variables: {
            id: activeOrder._id,
            paymentIntentId: intent.id
          }
        });
        setPaymentIntent(intent);
      };
      createPaymentIntent();
    } else if (activeOrder && activeOrder.paymentIntentId) {
      const retrievePaymentIntent = async () => {
        const intent = await app.currentUser.functions.retrievePaymentIntent(activeOrder.paymentIntentId);
        setPaymentIntent(intent);
      };
      retrievePaymentIntent();
    }
  }, [activeOrder, app.currentUser]);

  useEffect(() => {
    // Get the client secret from the url params, this gets added by stripe when redirected
    // here after payment. If client secret isn't available then no payment has happened yet.
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    if (clientSecret) {
      setStripeTransactionHasCompleted(true);
    }
  }, [paymentIntent]);

  return (
    paymentIntent
      ? <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.client_secret }}>
        {
          stripeTransactionHasCompleted
            ? <PaymentSummary paymentIntent={paymentIntent} />
            : <PaymentForm paymentIntent={paymentIntent} user={app.currentUser} />
        }
        </Elements>
      : <CircularProgress />

  );
};

export default Checkout;
