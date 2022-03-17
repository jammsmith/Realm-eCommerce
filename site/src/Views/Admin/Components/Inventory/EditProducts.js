import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import { PRODUCTS_SEARCH } from '../../../../graphql/queries';

const EditProducts = () => {
  const { data } = useQuery(PRODUCTS_SEARCH, { variables: { name: 'conc' } });
  return <p>EditProducts</p>;
};

EditProducts.propTypes = {

};

export default EditProducts;
