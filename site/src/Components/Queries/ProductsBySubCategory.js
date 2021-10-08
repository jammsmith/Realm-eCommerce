import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { productsBySubCategory } from '../../graphql/queries.js';

const ProductsBySubCategory = ({ children, category, subCategory }) => {
  return (
    <DDQuery query={productsBySubCategory} variables={{ category, subCategory }}>
      {data => {
        return children(data.productsBySubCategory);
      }}
    </DDQuery>
  );
};

ProductsBySubCategory.propTypes = {
  children: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired
};

export default ProductsBySubCategory;
