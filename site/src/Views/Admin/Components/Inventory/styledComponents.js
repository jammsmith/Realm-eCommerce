import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const Item = styled.div`
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
`;

export const SearchWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const InventorySection = styled.div`
  background-color: #fff;
  padding: 1rem;
  height: 90vh;
  flex: 0.5;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  border-radius: 10px;
`;

export const EditFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const DialogHeading = styled.div`
  margin: 0 1rem;
`;

export const DialogButtons = styled.div`

`;
