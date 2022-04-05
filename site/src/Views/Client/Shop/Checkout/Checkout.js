import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import CheckoutForms from './CheckoutForms.js';
import Summary from './Summary.js';
import useScrollToTop from '../../../../hooks/useScrollToTop.js';

const Checkout = (props) => {
  useScrollToTop();
  const [urlParams, setUrlParams] = useState();
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
      history.push('/shop/checkout');
    }
  }, [history]);
  return (
    urlParams && urlParams.paymentIntentId
      ? <Summary urlParams={urlParams} />
      : <CheckoutForms {...props} />
  );
};

Checkout.propTypes = {
  stripePromise: PropTypes.object.isRequired,
  activeOrder: PropTypes.object,
  updateActiveOrder: PropTypes.func
};

export default Checkout;
