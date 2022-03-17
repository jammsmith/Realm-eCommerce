import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_ORDER_DETAILED } from '../../graphql/queries.js';

const SingleOrderDetailed = ({ children, orderId, pollInterval }) => {
  return (
    <DDQuery query={SINGLE_ORDER_DETAILED} variables={{ orderId }} pollInterval={pollInterval}>
      {data => {
        return children(data.order);
      }}
    </DDQuery>
  );
};

SingleOrderDetailed.propTypes = {
  children: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired
};

export default SingleOrderDetailed;
