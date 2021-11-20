import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_CATEGORY } from '../../graphql/queries.js';

const SingleCategory = ({ children, name }) => {
  return (
    <DDQuery query={SINGLE_CATEGORY} variables={{ name }}>
      {data => {
        return children(data.category);
      }}
    </DDQuery>
  );
};

SingleCategory.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default SingleCategory;
