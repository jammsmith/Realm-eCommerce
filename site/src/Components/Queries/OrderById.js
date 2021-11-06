import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { orderById } from '../../graphql/queries.js';

const OrderById = ({ children, orderId, pollInterval }) => {
  return (
    <DDQuery query={orderById} variables={{ id: orderId }} pollInterval={pollInterval}>
      {data => {
        return children(data.orderById);
      }}
    </DDQuery>
  );
};

OrderById.propTypes = {
  children: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  pollInterval: PropTypes.number,
  refetch: PropTypes.func
};

export default OrderById;
