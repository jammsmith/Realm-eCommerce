import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_SUBCATEGORY } from '../../graphql/queries.js';

const SingleSubCategory = ({ children, name, category }) => {
  return (
    <DDQuery query={SINGLE_SUBCATEGORY} variables={{ name, category }}>
      {data => {
        return children(data.subCategory);
      }}
    </DDQuery>
  );
};

SingleSubCategory.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
};

export default SingleSubCategory;
