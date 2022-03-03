import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Components
import ActionButton from '../../../../Components/ActionButton.js';
import ProgressSpinner from '../../../../Components/ProgressSpinner.js';
import Heading from '../../../../Components/Heading.js';
import UserMessage from '../../../../Components/UserMessage.js';

// Styled components
import { CheckoutItem } from './StyledComponents.js';

// Hooks / helpers
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';

const PaymentForm = ({ deliveryDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addDeliveryDetailsToOrder] = useDDMutation(mutations.AddDeliveryDetailsToOrder);

  const handleSubmitPayment = async (event) => {
    event.preventDefault();

    if (deliveryDetails && deliveryDetails.address === '') {
      setErrorMessage('Please complete and confirm delivery details before submitting payment');
      return;
    }
    if (!stripe || !elements) return;

    setIsLoading(true);

    await addDeliveryDetailsToOrder({ variables: deliveryDetails });

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/shop/checkout'
      }
    });

    // This will only be reached if an error has occurred.  Show the error
    // in a message for the customer. Otherwise, customer is redirected to 'return_url'
    if (stripeError.type === 'card_error' || stripeError.type === 'validation_error') {
      setErrorMessage(stripeError.message);
    } else {
      setErrorMessage('An unexpected error occured.');
    }
    setIsLoading(false);
  };

  return (
    <CheckoutItem>
      <form>
        <Heading text='Payment Details' />
        <div>
          <PaymentElement />
          {errorMessage && <UserMessage type='error' message={errorMessage} />}
        </div>
        <div>
          <UserMessage
            type='warning'
            message='Clicking pay now will submit your payment'
          />
          <ActionButton
            text={isLoading ? <ProgressSpinner /> : 'pay now'}
            onClick={handleSubmitPayment}
            disabled={!stripe || !elements}
            fullWidth
          />
        </div>
      </form>
    </CheckoutItem>
  );
};

PaymentForm.propTypes = {
  deliveryDetails: PropTypes.object.isRequired
};

export default PaymentForm;
