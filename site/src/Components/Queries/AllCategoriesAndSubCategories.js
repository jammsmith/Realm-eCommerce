import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { ALL_CATEGORIES_AND_SUBCATEGORIES } from '../../graphql/queries.js';

const AllCategoriesAndSubCategories = ({ children }) => {
  return (
    <DDQuery query={ALL_CATEGORIES_AND_SUBCATEGORIES}>
      {data => {
        return children(data.categories);
      }}
    </DDQuery>
  );
};

AllCategoriesAndSubCategories.propTypes = {
  children: PropTypes.func.isRequired
};

export default AllCategoriesAndSubCategories;
