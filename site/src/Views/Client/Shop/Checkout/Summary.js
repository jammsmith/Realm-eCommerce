import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { RealmAppContext } from '../../../../realmApolloClient.js';
import Cart from '../Cart/Cart.js';
import ActionButton from '../../../../Components/ActionButton.js';
import LoadingView from '../../../../Components/LoadingView.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';
import { ORDER_BY_PAYMENT_INTENT } from '../../../../graphql/queries.js';
import { isAuthenticated } from '../../../../helpers/auth.js';

// Styled Components
import { SummaryWrapper, SummaryItem, SummaryRow, Text } from './StyledComponents.js';

const Summary = ({ urlParams }) => {
  const app = useContext(RealmAppContext);
  const history = useHistory();
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [message, setMessage] = useState('');
  const [order, setOrder] = useState();

  const [getOrder] = useLazyQuery(ORDER_BY_PAYMENT_INTENT, {
    onCompleted: (data) => {
      setOrder(data.order);
    }
  });
  const [updateUser] = useDDMutation(mutations.UpdateUser);
  const [updateUserAddresses] = useDDMutation(mutations.UpdateUserAddresses);
  const [updateAddress] = useDDMutation(mutations.UpdateAddress);

  useEffect(() => {
    const retrievePaymentIntent = async () => {
      const intent = await app.currentUser.functions.stripe_retrievePaymentIntent(urlParams.paymentIntentId);
      setPaymentIntent(intent);
    };
    retrievePaymentIntent();
  }, [urlParams, app.currentUser]);

  useEffect(() => {
    if (paymentIntent) {
      switch (paymentIntent.status) {
        case 'succeeded':
          getOrder({ variables: { paymentIntentId: paymentIntent.id } });
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
  }, [paymentIntent, getOrder]);

  const handleRegister = async (e, delivery) => {
    e.preventDefault();
    const { dbUser } = app.currentUser;

    try {
      await updateAddress({
        variables: {
          address_id: delivery.address.address_id,
          isDefault: true
        }
      }); // should do this after registration so they cant access it without registering first
      await updateUser({
        variables: {
          id: dbUser._id,
          firstName: delivery.firstName,
          lastName: delivery.lastName,
          email: delivery.email,
          phone: delivery.phone
        }
      });
      const { data } = await updateUserAddresses({
        variables: {
          id: dbUser._id,
          addresses: [delivery.address.address_id]
        }
      });

      await app.setCurrentUser(user => ({
        ...user,
        dbUser: data.updateOneUser
      }));
    } catch (err) {
      throw new Error('Failed to update user with order details. Error:', err.message);
    }

    // forward to register page to provide password etc
    history.push('/login');
  };

  return (
    <SummaryWrapper>
      <SummaryItem>
        <h4 style={{ margin: '1rem 0' }}>{message}</h4>
      </SummaryItem>
      {
        order ? (
          <>
            {
              isAuthenticated(app.currentUser) ? (
                <SummaryItem>
                  <Text>Click below to view the order in your account, or access any time by logging in</Text>
                  <ActionButton
                    text='view in my account'
                    linkTo='/my-account'
                    fullWidth
                  />
                </SummaryItem>
              ) : (
                <SummaryItem>
                  <Text>Register an account to track your order and save your delivery details for next time</Text>
                  <ActionButton
                    text='Click to register!'
                    onClick={(e) => handleRegister(e, order.delivery)}
                    fullWidth
                  />
                </SummaryItem>
              )
            }
            <Cart altOrder={order} isMinimised />
            {
              paymentIntent.status === 'succeeded' &&
                <SummaryItem>
                  <SummaryRow>
                    <Text>Order Reference Number:</Text>
                    <strong>{order.order_id}</strong>
                  </SummaryRow>
                  <SummaryRow>
                    <Text>You will receive a confirmation of your payment by email to:</Text>
                    <strong>{order.delivery.email}</strong>
                  </SummaryRow>
                </SummaryItem>
            }
          </>
        ) : <LoadingView />
      }
    </SummaryWrapper>
  );
};

Summary.propTypes = {
  urlParams: PropTypes.object.isRequired
};

export default Summary;
