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
  background-color: rgb(63,81,181);
  border-radius: 10px;
  color: white;
  font-weight: bold;
  padding: 1rem;
`;
export const OrdersWrapper = styled(GridItem)`
  grid-column: 1 / 7;
  grid-row: 1 / 1;
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

//
export const DataSection = styled.div`
  border-radius: 6px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 400px;
  justify-content: flex-start;
  padding: 1rem;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  width: 400px;
`;
export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 0.03px solid rgba(0,0,0,0.2);
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
`;
export const DataRowLeftItem = styled.h6`
  margin: 0;
`;
export const DataRowRightItem = styled.h4`
  margin: 0;
`;
export const DialogContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  gap: 1rem;
`;

// Delivery details
export const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

// Billing details
export const RefundWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Order Status
export const OrderStatusContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const OrderStatusRow = styled(DataRow)`
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0.5rem;
  border: none;
`;
export const StatusButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem
`;

// Inventory
export const InventoryButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
`;
