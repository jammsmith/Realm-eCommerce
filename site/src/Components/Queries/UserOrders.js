import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { USER_ORDERS } from '../../graphql/queries.js';

const UserOrders = ({ children, userId }) => {
  return (
    <DDQuery query={USER_ORDERS} variables={{ id: userId }}>
      {data => {
        return children(data.user);
      }}
    </DDQuery>
  );
};

UserOrders.propTypes = {
  children: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default UserOrders;
