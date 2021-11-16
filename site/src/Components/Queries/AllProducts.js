import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { ALL_PRODUCTS } from '../../graphql/queries.js';

const AllProducts = ({ children }) => {
  return (
    <DDQuery query={ALL_PRODUCTS}>
      {data => {
        return children(data.products);
      }}
    </DDQuery>
  );
};

AllProducts.propTypes = {
  children: PropTypes.func.isRequired
};

export default AllProducts;
