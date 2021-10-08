import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { allOrders } from '../../graphql/queries.js';

const AllOrders = ({ children }) => {
  return (
    <DDQuery query={allOrders}>
      {data => {
        return children(data.allOrders);
      }}
    </DDQuery>
  );
};

AllOrders.propTypes = {
  children: PropTypes.func.isRequired
};

export default AllOrders;
