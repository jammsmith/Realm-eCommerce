import React from 'react';
import PropTypes from 'prop-types';

import DDQuery from './DDQuery.js';
import { SINGLE_SUBCATEGORY } from '../../graphql/queries.js';

const SingleCategory = ({ children, id, name }) => {
  return (
    <DDQuery query={SINGLE_SUBCATEGORY} variables={{ id, name }}>
      {data => {
        return children(data.subCategory);
      }}
    </DDQuery>
  );
};

SingleCategory.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string
};

export default SingleCategory;
