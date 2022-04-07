import styled from 'styled-components';

export const ProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 95%;
  margin: auto;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  };
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    height: 398px
  };
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const AddToCartWrapper = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 200px;
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;
export const PrimaryButtons = styled.div`
  display: flex;  
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 768px) {
    max-width: 416px;
    flex-direction: row;
    gap: 1rem;
  }

`;

export const ContactUsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
