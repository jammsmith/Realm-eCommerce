import styled from 'styled-components';

// Not inside the grid wrapper
export const NavbarWrapper = styled.div`
  border: 2px solid yellow;
  height: 65px;
  margin-bottom: 16px;
`;

// Parent grid wrapper
export const AdminWrapper = styled.div`
  display: grid;
  height: calc(100vh - 97px);
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: 1fr 1fr;
  column-gap: 2rem;
  row-gap: 2rem;
  margin: 1rem;
`;

// Grid children -->

export const OrdersWrapper = styled.div`
  border: 2px solid red;
  grid-column: 1 / 6;
  grid-row: 1 / 1;
`;

export const InventoryWrapper = styled.div`
  border: 2px solid green;
  grid-column: 6 / 14;
  grid-row: 1 / 1;
`;

export const SalesGraphWrapper = styled.div`
  border: 2px solid blue;
  grid-column: 1 / 7;
  grid-row: 2 / 2;
`;

export const SiteStatsWrapper = styled.div`
  border: 2px solid orange;
  grid-column: 7 / 14;
  grid-row: 2 / 2;
`;
