import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { ALL_SUBCATEGORIES } from '../../graphql/queries.js';

const AllSubCategories = ({ children }) => {
  return (
    <DDQuery query={ALL_SUBCATEGORIES}>
      {data => {
        return children(data.subCategories);
      }}
    </DDQuery>
  );
};

AllSubCategories.propTypes = {
  children: PropTypes.func.isRequired
};

export default AllSubCategories;
