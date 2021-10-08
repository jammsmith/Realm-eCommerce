import styled from 'styled-components';
import colours from '../../../styles/colours.js';

const { light, dark } = colours;

export const OuterContainer = styled.div`
  background-color: ${light};
  border: 0.5px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem auto;
  padding: 0.2rem;
  width: 95%;
  max-width: 480px;
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProductTextContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProductTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

export const ProductPrice = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

export const InStockInfo = styled.h6`
  align-self: flex-end;
  margin: 0 0.25rem 0 0;
  text-align: right;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  margin: 0.25rem;
`;

// If props.showFullProduct. Used in actual product page to include extra details -->

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
