import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { userDetails } from '../../graphql/queries.js';

const UserDetails = ({ children, userId }) => {
  return (
    <DDQuery query={userDetails} variables={{ id: userId }}>
      {data => {
        return children(data.userByID);
      }}
    </DDQuery>
  );
};

UserDetails.propTypes = {
  children: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default UserDetails;
