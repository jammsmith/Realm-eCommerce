import React, { useState, useEffect, useContext } from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import CircularProgress from '@mui/material/CircularProgress';

// Helpers/hooks
import useActiveOrder from '../../../../hooks/useActiveOrder.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';

const Checkout = ({ stripePromise }) => {
  const [activeOrder] = useActiveOrder();
  const app = useContext(RealmAppContext);
  const [paymentIntent, setPaymentIntent] = useState(null);

  useEffect(() => {
    const getPaymentIntent = async () => {
      const intent = await app.currentUser.functions.getPaymentIntent(activeOrder);
      setPaymentIntent(intent);
    };
    getPaymentIntent();
  }, [activeOrder, app.currentUser]);

  return (
    paymentIntent
      ? <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.client_secret }}>
        <PaymentElement />
        </Elements>
      : <>
        <h2>Preparing your order</h2>
        <CircularProgress />
        </>
  );
};

export default Checkout;
