import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Colours
import colours from '../styles/colours.js';
const { darkFade, dark } = colours;

export const StyledHeading = styled.h4`
  color: ${dark};
  paddingTop: 0.5rem;
  paddingBottom: 0.25rem;
  margin-bottom: 0.25rem;
  border-bottom: 1px solid ${darkFade};
`;

const Heading = ({ text }) => {
  return <StyledHeading>{text}</StyledHeading>;
};

Heading.propTypes = {
  text: PropTypes.string.isRequired
};

export default Heading;
