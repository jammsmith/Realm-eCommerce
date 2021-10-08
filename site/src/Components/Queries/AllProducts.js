import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { allProducts } from '../../graphql/queries.js';

const AllProducts = ({ children }) => {
  return (
    <DDQuery query={allProducts}>
      {data => {
        return children(data.allProducts);
      }}
    </DDQuery>
  );
};

AllProducts.propTypes = {
  children: PropTypes.func.isRequired
};

export default AllProducts;
