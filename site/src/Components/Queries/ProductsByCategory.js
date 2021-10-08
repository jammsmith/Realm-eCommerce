import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { productsByCategory } from '../../graphql/queries.js';

const ProductsByCategory = ({ children, category }) => {
  return (
    <DDQuery query={productsByCategory} variables={{ category }}>
      {data => {
        return children(data.productsByCategory);
      }}
    </DDQuery>
  );
};

ProductsByCategory.propTypes = {
  children: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired
};

export default ProductsByCategory;
