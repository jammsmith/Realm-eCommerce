import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { allSubCategories } from '../../graphql/queries.js';

const AllSubCategories = ({ children }) => {
  return (
    <DDQuery query={allSubCategories}>
      {data => {
        return children(data.allSubCategories);
      }}
    </DDQuery>
  );
};

AllSubCategories.propTypes = {
  children: PropTypes.func.isRequired
};

export default AllSubCategories;
