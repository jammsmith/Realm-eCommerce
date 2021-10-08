import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { orderById } from '../../graphql/queries.js';

const OrderById = ({ children, orderId }) => {
  return (
    <DDQuery query={orderById} variables={{ id: orderId }}>
      {data => {
        return children(data.orderById);
      }}
    </DDQuery>
  );
};

OrderById.propTypes = {
  children: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired
};

export default OrderById;
