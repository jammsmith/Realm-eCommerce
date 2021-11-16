import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_PRODUCT } from '../../graphql/queries.js';

const SingleProduct = ({ children, id }) => {
  return (
    <DDQuery query={SINGLE_PRODUCT} variables={{ id: id }}>
      {data => {
        return children(data.product);
      }}
    </DDQuery>
  );
};

SingleProduct.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default SingleProduct;
