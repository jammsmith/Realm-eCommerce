import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Components
import ActionButton from '../../../../Components/ActionButton.js';
import CircularProgress from '@mui/material/CircularProgress';

const PaymentForm = ({ paymentIntent, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/checkout'
      }
    });

    // This will only be reached if an error has occurred.  Show the error
    // in a message for the customer. Otherwise, customer is redirected to 'return_url'
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }
    setIsLoading(false);
  };
  return (
    <form>
      <PaymentElement />
      {
        isLoading
          ? <CircularProgress />
          : <ActionButton
            text='Pay Now'
            onClick={handleSubmitPayment}
            disabled={!stripe || !elements}
            />
      }
      {message && <div>{message}</div>}
    </form>
  );
};

PaymentForm.propTypes = {
  paymentIntent: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default PaymentForm;
