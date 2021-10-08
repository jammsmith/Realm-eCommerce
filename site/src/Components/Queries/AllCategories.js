import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { allCategories } from '../../graphql/queries.js';

const AllCategories = ({ children }) => {
  return (
    <DDQuery query={allCategories}>
      {data => {
        return children(data.allCategories);
      }}
    </DDQuery>
  );
};

AllCategories.propTypes = {
  children: PropTypes.func.isRequired
};

export default AllCategories;
