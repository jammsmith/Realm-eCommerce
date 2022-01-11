import React, { useEffect, useState } from 'react';

const PaymentSummary = ({ paymentIntent }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
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
  }, [paymentIntent]);

  return <h1>{message}</h1>;
};

export default PaymentSummary;
