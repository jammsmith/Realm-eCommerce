import styled from 'styled-components';
import colours from '../../../styles/colours.js';

import ResponsiveTileWrapper from '../ResponsiveTileWrapper.js';
const { dark } = colours;

export const OuterContainer = styled(ResponsiveTileWrapper)`
  gap: 0.5rem;
  margin: 1rem auto;
  justify-content: space-between;
`;

export const Text = styled.h2`
  font-size: 1rem;
  margin: 0;
  @media (min-width: 320px) {
    font-size: 1.25rem;
  }
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProductTextContent = styled.div`
  display: none;
  @media (min-width: 360px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 4px;
`;

export const InStockInfo = styled(Text)`
  align-self: flex-end;
  margin-right: 4px;
  text-align: right;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  margin: 0.25rem;
`;

export const Description = styled.p`
  text-align: justify;
`;

export const LineBreak = styled.div`
  background: ${dark};
  border-radius: 10px;
  height: 0.25rem;
  margin: auto;
  width: 100%;
`;
