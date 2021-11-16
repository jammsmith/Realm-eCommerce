import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_ORDER_BASIC } from '../../graphql/queries.js';

const SingleOrderBasic = ({ children, id }) => {
  return (
    <DDQuery query={SINGLE_ORDER_BASIC} variables={{ id: id }}>
      {data => {
        return children(data.order);
      }}
    </DDQuery>
  );
};

SingleOrderBasic.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default SingleOrderBasic;
