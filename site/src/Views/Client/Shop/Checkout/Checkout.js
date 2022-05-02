import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Elements } from '@stripe/react-stripe-js';
import uniqueString from 'unique-string';

import PaymentForm from './PaymentForm.js';
import DeliveryForm from './DeliveryForm.js';
import AdditionalInfo from './AdditionalInfo.js';
import CartSummary from './CartSummary.js';
import LoadingView from '../../../../Components/LoadingView.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';
import { CurrencyContext } from '../../../../context/CurrencyContext.js';
import { OrderContext } from '../../../../context/OrderContext.js';

import { CheckoutFormsWrapper } from './StyledComponents.js';

const Checkout = ({ stripePromise }) => {
  const app = useContext(RealmAppContext);
  const { currency } = useContext(CurrencyContext);
  const { activeOrder, setActiveOrder, setDeliveryCountry } = useContext(OrderContext);

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    order_id: '',
    delivery_id: `delivery-${uniqueString()}`,
    address_id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: null,
    country: ''
  });
  const willCustomerPickUpInStore = useRef(false);

  const [additionalInfo, setAdditionalInfo] = useState('');
  const [checkoutCompletion, setCheckoutCompletion] = useState({
    personalFormComplete: false,
    deliveryFormComplete: false,
    paymentFormComplete: false
  });

  const [updateOrder] = useDDMutation(mutations.UpdateOrder);

  const { personalFormComplete, deliveryFormComplete, paymentFormComplete } = checkoutCompletion;
  const checkoutFormsComplete = !!(personalFormComplete && deliveryFormComplete && paymentFormComplete);

  //
  const updateCheckoutCompletion = useCallback((update) => {
    setCheckoutCompletion(prev => ({ ...prev, ...update }));
  }, [setCheckoutCompletion]);

  const updateDeliveryDetails = useCallback((update) => {
    setDeliveryDetails(prev => ({ ...prev, ...update }));
  }, [setDeliveryDetails]);

  // Set the order ID if there already is one
  useEffect(() => {
    if (activeOrder) {
      updateDeliveryDetails({ order_id: activeOrder.order_id });
    }
  }, [activeOrder, updateDeliveryDetails]);

  useEffect(() => {
    if (deliveryFormComplete && deliveryDetails.country && deliveryDetails.country !== '') {
      setDeliveryCountry(deliveryDetails.country);
    }
  }, [deliveryFormComplete, deliveryDetails.country]);

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
    if (activeOrder && activeOrder.orderItems && !activeOrder.paymentIntentId) {
      const createPaymentIntent = async () => {
        const intent = await app.currentUser.functions.stripe_createPaymentIntent({ ...activeOrder, currency });
        const { data } = await updateOrder({
          variables: {
            id: activeOrder._id,
            paymentIntentId: intent.id
          }
        });
        setPaymentIntent(intent);
        setActiveOrder(data.updateOneOrder);
      };
      createPaymentIntent();
    } else if (activeOrder && activeOrder.paymentIntentId) {
      const retrievePaymentIntent = async () => {
        const intent = await app.currentUser.functions.stripe_retrievePaymentIntent(activeOrder.paymentIntentId);
        setPaymentIntent(intent);
      };
      retrievePaymentIntent();
    }
  }, [activeOrder, setActiveOrder, app.currentUser, updateOrder, currency]);

  return (
    paymentIntent ? (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: paymentIntent.client_secret,
          appearance: paymentElementStyles
        }}
      >
        <CheckoutFormsWrapper>
          <DeliveryForm
            updateDeliveryDetails={updateDeliveryDetails}
            dbUser={app.currentUser.dbUser}
            updateCheckoutCompletion={updateCheckoutCompletion}
            willCustomerPickUpInStore={willCustomerPickUpInStore}
          />
          <AdditionalInfo
            additionalInfo={additionalInfo}
            updateAdditionalInfo={setAdditionalInfo}
          />
          <CartSummary
            willCustomerPickUpInStore={willCustomerPickUpInStore}
          />
          <PaymentForm
            deliveryDetails={deliveryDetails}
            additionalInfo={additionalInfo}
            checkoutFormsComplete={checkoutFormsComplete}
            updateCheckoutCompletion={updateCheckoutCompletion}
            updateOrder={updateOrder}
            paymentIntent={paymentIntent}
            willCustomerPickUpInStore={willCustomerPickUpInStore}
          />
        </CheckoutFormsWrapper>
      </Elements>
    ) : (
      <LoadingView message='Preparing your order for checkout' />
    )
  );
};

Checkout.propTypes = {
  stripePromise: PropTypes.object.isRequired
};

export default Checkout;
