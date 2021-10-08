import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { singleSubCategory } from '../../graphql/queries.js';

const SingleSubCategory = ({ children, name, category }) => {
  return (
    <DDQuery query={singleSubCategory} variables={{ name, category }}>
      {data => {
        return children(data.singleSubCategory);
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
