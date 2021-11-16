import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { ALL_ORDERS } from '../../graphql/queries.js';

const AllOrders = ({ children }) => {
  return (
    <DDQuery query={ALL_ORDERS}>
      {data => {
        return children(data.orders);
      }}
    </DDQuery>
  );
};

AllOrders.propTypes = {
  children: PropTypes.func.isRequired
};

export default AllOrders;
