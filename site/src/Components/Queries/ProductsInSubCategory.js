import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { PRODUCTS_IN_SUBCATEGORY } from '../../graphql/queries.js';

const ProductsInSubCategory = ({ children, subCategoryId }) => {
  return (
    <DDQuery query={PRODUCTS_IN_SUBCATEGORY} variables={{ id: subCategoryId }}>
      {data => {
        return children(data.subCategory);
      }}
    </DDQuery>
  );
};

ProductsInSubCategory.propTypes = {
  children: PropTypes.func.isRequired,
  subCategoryId: PropTypes.string.isRequired
};

export default ProductsInSubCategory;
