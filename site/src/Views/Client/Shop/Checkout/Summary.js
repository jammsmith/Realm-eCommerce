import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import CartSummary from './CartSummary.js';
import ActionButton from '../../../../Components/ActionButton.js';
import LoadingView from '../../../../Components/LoadingView.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';
import { ORDER_BY_PAYMENT_INTENT } from '../../../../graphql/queries.js';
import { isAuthenticated } from '../../../../helpers/auth.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';
import { CurrencyContext } from '../../../../context/CurrencyContext.js';

// Styled Components
import { SummaryWrapper, SummaryItem, SummaryRow, Text } from './StyledComponents.js';

const Summary = () => {
  const app = useContext(RealmAppContext);
  const { setCurrency } = useContext(CurrencyContext);

  const [successfulOrder, setSuccessfulOrder] = useState({});
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [message, setMessage] = useState('');

  const history = useHistory();

  const [getSuccessfulOrder] = useLazyQuery(ORDER_BY_PAYMENT_INTENT, {
    onCompleted: (data) => {
      setSuccessfulOrder(data.order);
    }
  });

  const [updateUser] = useDDMutation(mutations.UpdateUser);
  const [updateUserAddresses] = useDDMutation(mutations.UpdateUserAddresses);
  const [updateAddress] = useDDMutation(mutations.UpdateAddress);

  const handleRegister = async (e, delivery) => {
    e.preventDefault();
    const { dbUser } = app.currentUser;

    try {
      const { data } = await updateUser({
        variables: {
          id: dbUser._id,
          firstName: delivery.firstName,
          lastName: delivery.lastName,
          email: delivery.email,
          phone: delivery.phone
        }
      });
      let updatedUser = data.updateOneUser;

      if (delivery && delivery.address) {
        await updateAddress({
          variables: {
            address_id: delivery.address.address_id,
            isDefault: true
          }
        });
        const { data } = await updateUserAddresses({
          variables: {
            id: dbUser._id,
            addresses: [delivery.address.address_id]
          }
        });
        updatedUser = data.updateOneUser;
      }

      await app.setCurrentUser(user => ({
        ...user,
        dbUser: updatedUser
      }));

      // forward to register page to provide password etc
      history.push({ pathname: '/login', state: { form: 'register' } });
    } catch (err) {
      throw new Error('Failed to update user with order details. Error:', err.message);
    }
  };

  // Retrieve the payment intent object using the payment intent id provided by stripe in the url params
  const { stripe_retrievePaymentIntent: retrievePaymentIntent } = app.currentUser.functions;
  const getPaymentIntent = useCallback(async () => {
    try {
      const paymentIntentId = new URLSearchParams(window.location.search).get(
        'payment_intent'
      );
      if (paymentIntentId) {
        const intent = await retrievePaymentIntent(paymentIntentId);
        setPaymentIntent(intent);
        setCurrency(intent.currency.toUpperCase());
        history.replace('/shop/checkout/summary');
      } else if (!paymentIntent) {
        history.replace('/shop/cart');
      }
    } catch (err) {
      console.error(err);
    }
  }, [history, retrievePaymentIntent, setCurrency, paymentIntent]);

  useEffect(() => getPaymentIntent(), [getPaymentIntent]);

  // Show a message to the customer based on their order status
  useEffect(() => {
    if (paymentIntent) {
      switch (paymentIntent.status) {
        case 'succeeded':
          getSuccessfulOrder({ variables: { paymentIntentId: paymentIntent.id } });
          setMessage('Thank you! Your payment was successful!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default: setMessage('Something unusual happened. Please contact Doves and Dandys to check the status of your payment.');
          break;
      }
    }
  }, [paymentIntent, getSuccessfulOrder]);

  return (
    <SummaryWrapper>
      <SummaryItem>
        <h4 style={{ margin: '1rem 0' }}>{message}</h4>
      </SummaryItem>
      {
        paymentIntent && successfulOrder ? (
          <>
            {
              isAuthenticated(app.currentUser) ? (
                <SummaryItem>
                  <Text>Click below to view the order in your account, or access any time by logging in</Text>
                  <ActionButton
                    text='view in my account'
                    linkTo={{ pathname: '/my-account', state: { form: 'orders' } }}
                    fullWidth
                  />
                </SummaryItem>
              ) : (
                <SummaryItem>
                  <Text>Register an account to track your order and save your delivery details for next time</Text>
                  <ActionButton
                    text='Click to register!'
                    onClick={(e) => handleRegister(e, successfulOrder.delivery)}
                    fullWidth
                  />
                </SummaryItem>
              )
            }
            <CartSummary successfulOrder={successfulOrder} />
            {
              paymentIntent.status === 'succeeded' &&
                <SummaryItem>
                  <SummaryRow>
                    <Text>Order Reference Number:</Text>
                    <strong>{successfulOrder.order_id}</strong>
                  </SummaryRow>
                  <SummaryRow>
                    <Text>You will receive a confirmation of your payment by email to:</Text>
                    <strong>{successfulOrder.delivery && successfulOrder.delivery.email}</strong>
                  </SummaryRow>
                </SummaryItem>
            }
          </>
        ) : <LoadingView />
      }
    </SummaryWrapper>
  );
};

export default Summary;
