import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_ORDER_DETAILED } from '../../graphql/queries.js';

const SingleOrderDetailed = ({ children, id }) => {
  return (
    <DDQuery query={SINGLE_ORDER_DETAILED} variables={{ id }}>
      {data => {
        return children(data.order);
      }}
    </DDQuery>
  );
};

SingleOrderDetailed.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default SingleOrderDetailed;
