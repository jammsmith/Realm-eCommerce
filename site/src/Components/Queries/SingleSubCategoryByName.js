import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_SUBCATEGORY_BY_NAME } from '../../graphql/queries.js';

const SingleSubCategoryByName = ({ children, name, category }) => {
  return (
    <DDQuery query={SINGLE_SUBCATEGORY_BY_NAME} variables={{ name, category }}>
      {data => {
        return children(data.subCategory);
      }}
    </DDQuery>
  );
};

SingleSubCategoryByName.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default SingleSubCategoryByName;
