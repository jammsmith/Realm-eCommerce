import React, { useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const PaymentSummary = () => {
  const stripe = useStripe();

  useEffect(() => {

  }, [stripe]);

  // switch (paymentIntent.status) {
  //   case 'succeeded':
  //     setMessage('Payment succeeded!');
  //     break;
  //   case 'processing':
  //     setMessage('Your payment is processing.');
  //     break;
  //   case 'requires_payment_method':
  //     setMessage('Your payment was not successful, please try again.');
  //     break;
  //   default:
  //     setMessage('Something went wrong.');
  //     break;
  // }

  return <h1>boobs</h1>;
};

export default PaymentSummary;
