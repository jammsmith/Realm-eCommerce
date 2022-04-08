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
`;

export const CartWrapper = styled.div`
  ${props => props.isMinimised ? ({
      borderRadius: '5px',
      boxShadow: '-3px -1px 10px 2px rgba(0,0,0,0.2)',
      padding: '0.5rem',
      marginBottom: '1rem',
      '-webkit-box-shadow': '-3px -1px 10px 2px rgba(0,0,0,0.2)'
    }) : ({
      margin: '0 0.5rem'
    })
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
  justify-content: flex-end;
  gap: 2rem;
  padding: 0.5rem 2rem 0.5rem 0;
  border-bottom: none;
`;

export const ProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  margin: auto;
`;
