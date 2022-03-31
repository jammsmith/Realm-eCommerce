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
const GridItem = styled.div`
  background-color: rgba(63, 81, 181, 1);
  border-radius: 10px;
  color: white;
  font-weight: bold;
  padding: 1rem;
`;
export const OrdersWrapper = styled(GridItem)`
  grid-column: 1 / 7;
  grid-row: 1 / 1;
  display: flex;
  flex-direction: column;
`;

export const InventoryWrapper = styled(GridItem)`
  grid-column: 7 / 14;
  grid-row: 1 / 1;
`;

export const SalesGraphWrapper = styled(GridItem)`
  grid-column: 1 / 7;
  grid-row: 2 / 2;
`;

export const SiteStatsWrapper = styled(GridItem)`
  grid-column: 7 / 14;
  grid-row: 2 / 2;
`;

export const InventoryButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
`;

export const DialogContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem;
`;

export const DataLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
