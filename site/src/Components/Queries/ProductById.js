import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { productById } from '../../graphql/queries.js';

const ProductById = ({ children, productId }) => {
  return (
    <DDQuery query={productById} variables={{ id: productId }}>
      {data => {
        return children(data.productById);
      }}
    </DDQuery>
  );
};

ProductById.propTypes = {
  children: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired
};

export default ProductById;
