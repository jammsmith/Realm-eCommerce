import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  height: auto;
`;

const Image = (props) => {
  return <Img src={props.src} style={{ width: props.width }} />;
};

export default Image;
