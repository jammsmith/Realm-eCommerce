import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_CATEGORY } from '../../graphql/queries.js';

const SingleCategory = ({ children, userId, categoryName }) => {
  return (
    <DDQuery query={SINGLE_CATEGORY} variables={{ id: userId, name: categoryName }}>
      {data => {
        return children(data.subCategory);
      }}
    </DDQuery>
  );
};

SingleCategory.propTypes = {
  children: PropTypes.func.isRequired,
  userId: PropTypes.string,
  categoryName: PropTypes.string
};

export default SingleCategory;
