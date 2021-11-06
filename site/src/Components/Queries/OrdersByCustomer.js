import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { ordersByCustomer } from '../../graphql/queries.js';

const OrdersByCustomer = ({ children, customerId }) => {
  return (
    <DDQuery query={ordersByCustomer} variables={{ id: customerId }} fetchPolicy='network-only'>
      {data => {
        return children(data.ordersByCustomer);
      }}
    </DDQuery>
  );
};

OrdersByCustomer.propTypes = {
  children: PropTypes.func.isRequired,
  customerId: PropTypes.string.isRequired
};

export default OrdersByCustomer;
