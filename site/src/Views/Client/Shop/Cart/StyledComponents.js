import styled from 'styled-components';
import { IoAddCircleOutline, IoRemoveCircleSharp, IoTrashOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

// Colours
import colours from '../../../../styles/colours.js';
const { darkFade, dark } = colours;

// General
export const CartLine = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${darkFade};
  width: 100%;
  margin: auto;
`;

export const CartWrapper = styled.div`
  width: 100%;
  @media (min-width: 1024px) {
    width: ${props => props.isMinimised && '350px'};
  }
`;

// Cart Product
export const DetailsWrapper = styled.div`
  display: flex;
`;

export const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
`;

export const CartDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 5rem;
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
`;

export const Divider = styled.div`
  border-right: 0.05rem solid black;
  flex: 1;
`;

export const EditButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  align-self: center;
  align-items: center;
`;

export const IncreaseQuantityButton = styled(IoAddCircleOutline)`
  font-size: 1.75rem;
  :hover,
  :active {
    cursor: pointer;
  }
`;
export const DecreaseQuantityButton = styled(IoRemoveCircleSharp)`
  font-size: 1.75rem;
  :hover,
  :active {
    cursor: pointer;
  }
`;
export const RemoveItemButton = styled(IoTrashOutline)`
  font-size: 1.75rem;
  :hover,
  :active {
    cursor: pointer;
  }
`;

export const ProductLink = styled(Link)`
  color: ${dark};
`;

// Cart Product List
export const TotalsLine = styled(CartLine)`
  flex-direction: row;
  border-bottom: none;
  justify-content: flex-end;
  gap: 2rem;
  padding-top: 1rem;
  padding-right: 2rem;
`;

export const ProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  margin: auto;
`;
