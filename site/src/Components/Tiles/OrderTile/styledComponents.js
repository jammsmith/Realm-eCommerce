import styled from 'styled-components';
import colours from '../../../styles/colours.js';

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  border-radius: 6px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 1rem;
  overflow: hidden;
`;
export const OrderItems = styled.div`
  display: flex:
  flex-direction: column;
  gap: 1rem;
`;
export const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100px;
  padding: 0.5rem;
  border-top: 0.1px solid ${colours.dark};
`;
export const ItemInfo = styled.div`
  overflow: hidden;
`;
export const Info = styled.p`
  margin: 0 0 0.5rem;
`;
export const OrderStatus = styled(OrderItem)`
  border: none;
  justify-content: space-between;
  height: auto;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
export const CurrentStatusWrapper = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const CurrentStatus = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.75rem;
  background-color: ${colours.green};
  color: #fff;
  padding: 1.5rem 0;
  overflow: hidden;
  width: 340px;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 414px) {
    font-size: 1.25rem;
  }
`;
export const Image = styled.img`
  border-radius: 6px;
  height: 100px;
  width: auto;
`;
export const DataLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
