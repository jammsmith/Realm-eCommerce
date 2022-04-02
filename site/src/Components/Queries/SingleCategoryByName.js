import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_CATEGORY_BY_NAME } from '../../graphql/queries.js';

const SingleCategoryByName = ({ children, name }) => {
  return (
    <DDQuery query={SINGLE_CATEGORY_BY_NAME} variables={{ name }}>
      {data => {
        return children(data.category);
      }}
    </DDQuery>
  );
};

SingleCategoryByName.propTypes = {
  children: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default SingleCategoryByName;
