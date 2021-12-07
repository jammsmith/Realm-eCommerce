// External imports
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//
import ResponsiveTileWrapper from './ResponsiveTileWrapper.js';

// Colours
import colours from '../../styles/colours.js';
const { light, lightFade, dark } = colours;

// Custom styled components
export const Wrapper = styled(ResponsiveTileWrapper)`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 8px auto;
`;

const Image = styled.img`
  border-radius: 10px;
  max-width: 100%;
  height: auto;
`;

export const CategoryCaption = styled.h1`
  background-color: ${lightFade};
  border-radius: 30px;
  color: ${dark};
  font-size: 2rem;
  padding: 0.5rem 1.5rem;
  position: absolute;
  top: 43%;
  left: 12.5%;
  text-align: center;
  transition: background-color 0.2s ease-in-out;
  width: 75%;
  :active,
  :focus,
  :hover {
    background-color: ${light};
  }
`;

// Link to a specific category
const CategoryTile = ({ title, image, linkTo }) => {
  return (
    <Link to={linkTo}>
      <Wrapper>
        <Image src={image} alt='' />
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
