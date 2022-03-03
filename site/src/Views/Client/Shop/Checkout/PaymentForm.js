import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import uniqueString from 'unique-string';

import ActionButton from '../../../../Components/ActionButton.js';
import ProgressSpinner from '../../../../Components/ProgressSpinner.js';
import Heading from '../../../../Components/Heading.js';
import UserMessage from '../../../../Components/UserMessage.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';

// Styled components
import { CheckoutItem } from './StyledComponents.js';

const PaymentForm = ({ deliveryDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [createAddress] = useDDMutation(mutations.CreateAddress);
  const [addDeliveryDetailsToOrder] = useDDMutation(mutations.AddDeliveryDetailsToOrder);

  const handleSubmitPayment = async (event) => {
    event.preventDefault();

    if (deliveryDetails && deliveryDetails.address === '') {
      setErrorMessage('Please complete and confirm delivery details before submitting payment');
      return;
    }
    if (!stripe || !elements) return;

    setIsLoading(true);
    // Create a new address
    const { data } = await createAddress({
      variables: {
        address_id: `address-${await uniqueString()}`,
        line1: deliveryDetails.line1,
        line2: deliveryDetails.line2,
        city: deliveryDetails.city,
        county: deliveryDetails.county,
        postcode: deliveryDetails.postcode,
        country: deliveryDetails.country
      }
    });

    await addDeliveryDetailsToOrder({
      variables: {
        order_id: deliveryDetails.order_id,
        delivery_id: deliveryDetails.delivery_id,
        address_id: data.insertOneAddress.address_id,
        firstName: deliveryDetails.firstName,
        lastName: deliveryDetails.lastName,
        email: deliveryDetails.email,
        phone: deliveryDetails.phone
      }
    });

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
        <Heading text='Payment Details' size='small' />
        <div>
          <PaymentElement />
          {errorMessage && <UserMessage type='error' text={errorMessage} />}
        </div>
        <div>
          <UserMessage
            type='warning'
            text='Clicking pay now will submit your payment'
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
