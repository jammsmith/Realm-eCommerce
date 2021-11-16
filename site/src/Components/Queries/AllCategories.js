import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { ALL_CATEGORIES } from '../../graphql/queries.js';

const AllCategories = ({ children }) => {
  return (
    <DDQuery query={ALL_CATEGORIES}>
      {data => {
        return children(data.categories);
      }}
    </DDQuery>
  );
};

AllCategories.propTypes = {
  children: PropTypes.func.isRequired
};

export default AllCategories;
