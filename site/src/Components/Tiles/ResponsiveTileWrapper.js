import styled from 'styled-components';

const ResponsiveTileWrapper = styled.div`
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  height: auto;
  width: 240px;
  @media (min-width: 320px) {
    width: 320px;
  }
  @media (min-width: 360px) {
    width: 360px;
  }
  @media (min-width: 414px) {
    width: 414px;
  }
`;

export default ResponsiveTileWrapper;
