import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_SUBCATEGORY_AND_PRODUCTS } from '../../graphql/queries.js';

const SingleCategoryAndProducts = ({ children, subCategoryId }) => {
  return (
    <DDQuery query={SINGLE_SUBCATEGORY_AND_PRODUCTS} variables={{ id: subCategoryId }}>
      {data => {
        return children(data.subCategory);
      }}
    </DDQuery>
  );
};

SingleCategoryAndProducts.propTypes = {
  children: PropTypes.func.isRequired,
  subCategoryId: PropTypes.string.isRequired
};

export default SingleCategoryAndProducts;
