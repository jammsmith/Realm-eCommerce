// External imports
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ResponsiveTileWrapper from './ResponsiveTileWrapper.js';

// Colours
import colours from '../../styles/colours.js';
const { light, lightFade, dark } = colours;

// Custom styled components
export const Wrapper = styled(ResponsiveTileWrapper)`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Image = styled.img`
  border-radius: 6px;
  max-width: 100%;
  height: auto;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2); 
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
`;

export const CategoryCaption = styled.h1`
  background-color: ${lightFade};
  color: ${dark};
  font-size: 1.5rem;
  padding: 0.5rem 1.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  :active,
  :focus,
  :hover {
    background-color: ${light};
  };
`;

// Link to a specific category
const CategoryTile = ({ title, image, linkTo }) => {
  return (
    <Link to={linkTo}>
      <Wrapper>
        <Image src={image} alt={title} />
        <CategoryCaption>{title}</CategoryCaption>
      </Wrapper>
    </Link>
  );
};

CategoryTile.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired
};

export default CategoryTile;
