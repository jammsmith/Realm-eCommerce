import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { categoryByName } from '../../graphql/queries.js';

const CategoryByName = ({ children, categoryName }) => {
  return (
    <DDQuery query={categoryByName} variables={{ name: categoryName }}>
      {data => {
        return children(data.categoryByName);
      }}
    </DDQuery>
  );
};

CategoryByName.propTypes = {
  children: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired
};

export default CategoryByName;
