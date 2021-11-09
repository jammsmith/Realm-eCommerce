import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement style={{ width: '3rem', height: '2rem' }} />
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;
