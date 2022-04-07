import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colours from '../../../../styles/colours.js';

const { dark } = colours;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 316px;
`;
const MainImage = styled.img`
  border: 0.2px solid ${dark};
  border-radius: 10px;
  width: 316px;
  height: 316px;
`;
const AllImages = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const MiniImage = styled.img`
  border: 0.2px solid ${dark};
  border-radius: 10px;
  width: 100px;
  height: 100px;
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
              ? <SelectedImage key={index} src={img} onClick={() => setCurrentImage(img)} />
              : <MiniImage key={index} src={img} onClick={() => setCurrentImage(img)} />
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
