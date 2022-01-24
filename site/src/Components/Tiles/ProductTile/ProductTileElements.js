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
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2); 
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
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
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InStockInfo = styled(Text)`
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
