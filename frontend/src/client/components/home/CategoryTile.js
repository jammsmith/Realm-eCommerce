import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import colours from '../../../styles/colours';
const { lightFade, dark } = colours;

const TileWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Image = styled.img`
  border-radius: 10px;  
  width: 100%;
  height: auto;
`;

const Caption = styled.h1`
  background-color: ${lightFade};
  border-radius: 30px;
  color: ${dark};
  font-size: 2rem;
  padding: 0.5rem 1.5rem;
  position: absolute;
  top: 43%;
  left: 12.5%;
  text-align: center;
  width: 75%;
`;

const CategoryTile = (props) => {
  return (
    <Link to={props.linkTo}>
      <TileWrapper>
        <Image src={props.imageSrc} alt={props.imageAltText} />
        <Caption>{props.text}</Caption>
      </TileWrapper>
    </Link>
  );
};

export default CategoryTile;
