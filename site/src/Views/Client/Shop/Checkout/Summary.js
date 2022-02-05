import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Components etc
import { RealmAppContext } from '../../../../realmApolloClient.js';
import OrderByPaymentIntent from '../../../../Components/Queries/OrderByPaymentIntent.js';
import Cart from '../Cart/Cart.js';

// Styled Components
import { SummaryWrapper, SummaryItem, SummaryRow, Text } from './StyledComponents.js';

const Summary = ({ urlParams }) => {
  const app = useContext(RealmAppContext);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const { realmUser } = app.currentUser;
    const retrievePaymentIntent = async () => {
      const intent = await realmUser.functions.retrievePaymentIntent(urlParams.paymentIntentId);
      setPaymentIntent(intent);
    };
    retrievePaymentIntent();
  }, [urlParams, app.currentUser]);

  useEffect(() => {
    if (paymentIntent) {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Thank you! Your payment was successful!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default: setMessage('Something went wrong.');
          break;
      }
    }
  }, [paymentIntent]);

  return (
    paymentIntent
      ? <OrderByPaymentIntent paymentIntentId={paymentIntent.id}>
        {
          order =>
            <SummaryWrapper>
              <Cart altOrder={order} isMinimised />
              <SummaryItem>
                <h4 style={{ margin: '1rem 0' }}>{message}</h4>
              </SummaryItem>
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
            </SummaryWrapper>
        }
      </OrderByPaymentIntent>
      : null
  );
};

Summary.propTypes = {
  urlParams: PropTypes.object.isRequired
};

export default Summary;
