import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Components
import ActionButton from '../../../../Components/ActionButton.js';
import ProgressSpinner from '../../../../Components/ProgressSpinner.js';

// Styled components
import { FormWrapper, FormHeader, Warning } from './StyledComponents.js';

const PaymentForm = () => {
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
    <FormWrapper>
      <FormHeader>Please provide your billing details</FormHeader>
      <form>
        <PaymentElement />
        {message && <div>{message}</div>}
        <div style={{ marginBottom: '2rem' }}>
          <Warning>Clicking 'pay now' will submit your payment</Warning>
          <ActionButton
            text={isLoading ? <ProgressSpinner /> : 'Pay Now'}
            onClick={handleSubmitPayment}
            disabled={!stripe || !elements}
            fullWidth
            customStyles={{ top: '1rem' }}
          />
        </div>
      </form>
    </FormWrapper>
  );
};

export default PaymentForm;
