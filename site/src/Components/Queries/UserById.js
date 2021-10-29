import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { userById } from '../../graphql/queries.js';

const UserById = ({ children, userId }) => {
  return (
    <DDQuery query={userById} variables={{ id: userId }}>
      {data => {
        return children(data.userById);
      }}
    </DDQuery>
  );
};

UserById.propTypes = {
  children: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default UserById;
