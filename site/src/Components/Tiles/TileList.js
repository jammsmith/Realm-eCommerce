// External imports
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Custom styled components
const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

// Display multiple tiles
const TileList = ({ children }) => {
  return (
    <FlexContainer>
      {children}
    </FlexContainer>
  );
};

TileList.propTypes = {
  children: PropTypes.func.isRequired
};

export default TileList;
