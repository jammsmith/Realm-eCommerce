import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Colours
import colours from '../styles/colours.js';
const { darkFade, dark } = colours;

export const StyledHeading = styled.h4`
  color: ${dark};
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
  margin-bottom: 0.25rem;
  border-bottom: 1px solid ${darkFade};
  font-size: ${props => props.size === 'small' ? '1.25rem' : '1.5rem'}
`;

const Heading = ({ text, size }) => {
  return <StyledHeading size={size}>{text}</StyledHeading>;
};

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default Heading;
