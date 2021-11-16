import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_USER } from '../../graphql/queries.js';

const SingleUser = ({ children, userId }) => {
  return (
    <DDQuery query={SINGLE_USER} variables={{ id: userId }}>
      {data => {
        return children(data.user);
      }}
    </DDQuery>
  );
};

SingleUser.propTypes = {
  children: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default SingleUser;
