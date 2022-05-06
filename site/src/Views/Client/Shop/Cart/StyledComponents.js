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
  :hover {
    color: ${dark};
  }
`;

// Cart Product List
export const TotalsWrapper = styled.div`
  display: flex;
  padding-top: 0.5rem;
  padding-right: 2rem;
`;

export const TotalsLine = styled(CartLine)`
  flex-direction: row;
  border-bottom: none;
  text-align: left;
  width: 150px;
`;

export const TotalsRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const ProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  margin: auto;
`;

export const DeliveryPrice = styled.h6`
  ${({ showLineThrough }) => showLineThrough && ({
    color: darkFade,
    textDecoration: 'line-through',
    marginRight: '0.5rem'
  })}
`;
