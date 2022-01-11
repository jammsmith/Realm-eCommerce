import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Components / Views
import Payment from './Payment.js';
import Summary from './Summary.js';

const Checkout = ({ stripePromise }) => {
  const [urlParams, setUrlParams] = useState({});
  const history = useHistory();

  useEffect(() => {
    // Get the client secret from the url params, this gets added by stripe when redirected
    // here after payment. If client secret isn't available then no payment has happened yet.
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    const paymentIntent = new URLSearchParams(window.location.search).get(
      'payment_intent'
    );
    if (paymentIntent) {
      setUrlParams({
        clientSecretId: clientSecret,
        paymentIntentId: paymentIntent
      });

      // re-direct back to checkout removes client secret etc from url
      history.push('/checkout');
    }
  }, []);
  return (
    urlParams.paymentIntentId
      ? <Summary urlParams={urlParams} />
      : <Payment stripePromise={stripePromise} />
  );
};

export default Checkout;
