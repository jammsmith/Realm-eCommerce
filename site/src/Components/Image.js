// External imports
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Custom styled components
const Img = styled.img`
  height: auto;
  max-width: 100%;
`;

//
const Image = ({ src, alt }) => {
  return <Img src={src} alt={alt} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default Image;
