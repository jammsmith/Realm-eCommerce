import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

const DDQuery = ({ children, query, variables }) => {
  const { loading, error, data } = useQuery(query, {
    variables: variables
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.log('Error in DDQuery:', error);
    return <h2>Error</h2>;
  }

  return children(data);
};

DDQuery.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  variables: PropTypes.object
};

export default DDQuery;
