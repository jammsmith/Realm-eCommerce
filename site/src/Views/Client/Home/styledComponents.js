import styled from 'styled-components';

export const GoToShopWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

export const ImagesWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin: 0 1rem;
  @media (min-width: 768px) {
    height: 400px;
    flex-direction: row;
  }
`;

export const PrimaryImage = styled.img`
  border-radius: 6px;
  height: auto;
  width: 100%;
  @media (min-width: 768px) {
    height: 100%;
    width: auto;
  }

`;

export const SecondaryImages = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media (min-width: 768px) {
    flex-direction: column;
  }
`;

export const SecondaryImage = styled.img`
  border-radius: 6px;
  height: auto;
  width: 48%;
  @media (min-width: 768px) {
    height: 192px;
    width: auto;
  }
`;
