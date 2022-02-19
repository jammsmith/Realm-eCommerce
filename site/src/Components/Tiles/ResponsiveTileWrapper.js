import styled from 'styled-components';

const ResponsiveTileWrapper = styled.div`
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  margin: auto;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  width: 240px;
  height: ${props =>
    props.productTile
      ? props.viewAsSingleProduct
        ? '490px'
        : '280px'
      : '240px'
  };
  @media (min-width: 320px) {
    width: 320px;
    height: ${props =>
      props.productTile
        ? props.viewAsSingleProduct
          ? '440px'
          : '340px'
        : '240px'
    };
  }
  @media (min-width: 360px) {
    width: 360px;
    height: ${props =>
      props.productTile
        ? props.viewAsSingleProduct
          ? '520px'
          : '420px'
        : '270px'
    };
  }
  @media (min-width: 414px) {
    width: 414px;
    height: ${props =>
      props.productTile
        ? props.viewAsSingleProduct
          ? '561px'
          : '451px'
        : '311px'
    };
  }
`;

export default ResponsiveTileWrapper;
