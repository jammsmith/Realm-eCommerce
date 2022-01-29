import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { ORDER_BY_PAYMENT_INTENT } from '../../graphql/queries.js';

const OrderByPaymentIntent = ({ children, paymentIntentId }) => {
  return (
    <DDQuery query={ORDER_BY_PAYMENT_INTENT} variables={{ paymentIntentId: paymentIntentId }}>
      {data => {
        return children(data.order);
      }}
    </DDQuery>
  );
};

OrderByPaymentIntent.propTypes = {
  children: PropTypes.func.isRequired,
  paymentIntentId: PropTypes.string.isRequired
};

export default OrderByPaymentIntent;
