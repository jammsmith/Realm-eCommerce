import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import uniqueString from 'unique-string';

// Styled components
import { CheckoutFormsWrapper } from './StyledComponents.js';

// Components
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import LoadingView from '../../../../Components/LoadingView.js';
import PaymentForm from './PaymentForm.js';
import DeliveryForm from './DeliveryForm.js';
import Cart from '../Cart/Cart.js';

// Helpers/hooks
import useActiveOrder from '../../../../hooks/useActiveOrder.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';

const CheckoutForms = ({ stripePromise }) => {
  const app = useContext(RealmAppContext);
  const [activeOrder] = useActiveOrder();
  const [updateOrder] = useDDMutation(mutations.UpdateOrder);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    order_id: '',
    delivery_id: `delivery-${uniqueString()}`,
    address: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: null
  });

  if (!activeOrder) {
    console.log('no');
  }

  useEffect(() => {
    if (activeOrder) {
      setDeliveryDetails(prev => ({ ...prev, order_id: activeOrder.order_id }));
    }
  }, [activeOrder]);

  // Payment Element styling
  const paymentElementStyles = {
    theme: 'flat',
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '5px',
      colorBackground: '#F6F8FA',
      colorPrimaryText: '#262626'
    },
    rules: {
      '.Block': {
        backgroundColor: 'var(--colorBackground)',
        boxShadow: 'none',
        padding: '12px'
      },
      '.Input': {
        padding: '12px'
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: 'lightgray'
      },
      '.Tab': {
        padding: '10px 12px 8px 12px',
        border: 'none'
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Label': {
        fontWeight: '500'
      }
    }
  };

  // Get a new payment intent if one does not already exist, or retrieve the existing one if it does -->
  useEffect(() => {
    if (activeOrder && !activeOrder.paymentIntentId) {
      const createPaymentIntent = async () => {
        const intent = await app.currentUser.functions.createPaymentIntent(activeOrder);
        updateOrder({
          variables: {
            id: activeOrder._id,
            paymentIntentId: intent.id
          }
        });
        setPaymentIntent(intent);
      };
      createPaymentIntent();
    } else if (activeOrder && activeOrder.paymentIntentId) {
      const retrievePaymentIntent = async () => {
        const intent = await app.currentUser.functions.retrievePaymentIntent(activeOrder.paymentIntentId);
        setPaymentIntent(intent);
      };
      retrievePaymentIntent();
    }
  }, [activeOrder, app.currentUser, updateOrder]);

  return (
    <>
      <SectionSpacer dark spaceBelow />
      {
        paymentIntent
          ? <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.client_secret, paymentElementStyles }}>
            <CheckoutFormsWrapper>
              <Cart isMinimised />
              <DeliveryForm deliveryDetailsState={[deliveryDetails, setDeliveryDetails]} />
              <PaymentForm deliveryDetails={deliveryDetails} />
            </CheckoutFormsWrapper>
            </Elements>
          : <LoadingView
            redirect='cart'
            initialMessage='Preparing your order for checkout'
            />
      }
    </>
  );
};

CheckoutForms.propTypes = {
  stripePromise: PropTypes.object.isRequired
};

export default CheckoutForms;
