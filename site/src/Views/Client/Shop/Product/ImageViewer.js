import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colours from '../../../../styles/colours.js';

const { dark } = colours;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 398px;
`;
const MainImage = styled.img`
  border: 0.2px solid ${dark};
  border-radius: 10px;
  width: 100%;
  height: auto;
`;
const AllImages = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.45rem;
  @media (max-width: 414px) {
    gap: 0.35rem;
  }
`;
const MiniImage = styled.img`
  border: 0.2px solid ${dark};
  border-radius: 10px;
  width: 32%;
  height: auto;
  margin-top: 0.5rem;
  :hover {
    cursor: pointer;
  }
`;
const SelectedImage = styled(MiniImage)`
  border-width: 2.5px;
`;

const ImageViewer = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  return (
    <Container>
      <MainImage src={currentImage} />
      <AllImages>
        {
          images.map((img, index) => (
            img === currentImage
              ? <SelectedImage key={index} src={img} alt='Main product image' onClick={() => setCurrentImage(img)} />
              : <MiniImage key={index} src={img} alt='Secondary product image' onClick={() => setCurrentImage(img)} />
          ))
        }
      </AllImages>
    </Container>
  );
};

ImageViewer.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageViewer;
