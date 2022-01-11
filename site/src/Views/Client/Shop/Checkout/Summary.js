import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { RealmAppContext } from '../../../../realmApolloClient.js';

const Summary = ({ urlParams }) => {
  const app = useContext(RealmAppContext);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const retrievePaymentIntent = async () => {
      const intent = await app.currentUser.functions.retrievePaymentIntent(urlParams.paymentIntentId);
      setPaymentIntent(intent);
    };
    retrievePaymentIntent();
  }, [urlParams, app.currentUser]);

  useEffect(() => {
    if (paymentIntent) {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    }
  }, [paymentIntent]);

  return <h1>{message}</h1>;
};

Summary.propTypes = {
  urlParams: PropTypes.object.isRequired
};

export default Summary;
