import React from 'react';
import styled from 'styled-components';

import ResponsiveTileWrapper from './ResponsiveTileWrapper.js';
import Heading from '../Heading.js';

// Styled components
const Tile = styled(ResponsiveTileWrapper)`
  /* margin: 0; */
  height: auto;
  @media (max-width: 414px) {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px;
  
`;

const AccountTile = ({ children, heading }) => {
  return (
    <Tile>
      <Heading text={heading} />
      <Content>
        {children}
      </Content>
    </Tile>
  );
};

export default AccountTile;
