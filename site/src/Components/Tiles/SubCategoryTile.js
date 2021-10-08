// External imports
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Components
import { Wrapper, CategoryCaption } from './CategoryTile.js';

// Colours
import colours from '../../styles/colours.js';
const { light, dark, darkFade } = colours;

// Custom styled components
const Image = styled.img`
  border-radius: 10px;
  max-width: 100%;
  height: auto;
`;

const SubCategoryCaption = styled(CategoryCaption)`
  background-color: ${darkFade};
  color: ${light};
  :active,
  :focus,
  :hover {
    background-color: ${dark};
  }
`;

const SubCategoryWrapper = styled(Wrapper)`
  @media (min-width: 768px) {
    width: 20rem;
  }
`;

// Link to a specific sub-category
export const SubCategoryTile = ({ title, image, linkTo }) => {
  return (
    <Link to={linkTo}>
      <SubCategoryWrapper>
        <Image src={image} alt={title} />
        <SubCategoryCaption>{title}</SubCategoryCaption>
      </SubCategoryWrapper>
    </Link>
  );
};

SubCategoryTile.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired
};

export default SubCategoryTile;
