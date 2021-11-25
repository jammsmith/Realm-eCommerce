import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { USER_DETAILED } from '../../graphql/queries.js';

const SingleUserDetailed = ({ children, userId }) => {
  return (
    <DDQuery query={USER_DETAILED} variables={{ id: userId }}>
      {data => {
        return children(data.user);
      }}
    </DDQuery>
  );
};

SingleUserDetailed.propTypes = {
  children: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default SingleUserDetailed;
