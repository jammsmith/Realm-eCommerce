import styled from 'styled-components';

export const OuterWrapper = styled.div`
  margin: 0 1rem 1rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const Image = styled.img`
  border-radius: 6px;
  display: inline-flex;
  height: calc(this.width * 1.84);
  margin: auto;
  max-width: 300px;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const ImageInsideText = styled(Image)`
  display: none;
  @media (min-width: 768px) {
    display: inline-flex;
    float: right;
    margin-left: 1rem;
  }
`;

export const TextWrapper = styled.div``;

export const TextSection = styled.p``;
