import styled from 'styled-components';

const ResponsiveTileWrapper = styled.div`
  margin: auto;
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
          : '461px'
        : '311px'
    };
  }
`;

export default ResponsiveTileWrapper;
