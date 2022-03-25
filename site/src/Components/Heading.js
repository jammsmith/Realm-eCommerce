import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Colours
import colours from '../styles/colours.js';
const { darkFade, dark } = colours;

export const StyledHeading = styled.h4`
  color: ${props => props.color || dark};
  ${props => !props.noSpace && ({
    paddingTop: '0.5rem',
    paddingBottom: '0.25rem',
    marginBottom: '0.25rem'
  })};
  border-bottom: 1px solid ${props => props.color || darkFade};
  font-size: ${props => props.size === 'small' ? '1.25rem' : '1.5rem'}
`;

const Heading = ({ text, ...other }) => {
  return <StyledHeading {...other}>{text}</StyledHeading>;
};

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  noSpace: PropTypes.bool
};

export default Heading;
