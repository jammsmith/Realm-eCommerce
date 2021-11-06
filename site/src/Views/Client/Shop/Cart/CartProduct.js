// External imports
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoAddCircleOutline, IoRemoveCircleSharp, IoTrashOutline } from 'react-icons/io5';

// GraphQL
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';

// Components
import ActionButton from '../../../../Components/ActionButton.js';

// Colours
import colours from '../../../../styles/colours.js';
const { darkFade } = colours;

// Styled components
export const CartLine = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${darkFade};
  width: 100%;
  margin: auto;
`;

const ProductDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
`;

const CartDetailsWrapper = styled.div`
  padding: 0.25rem;
`;

const EditButtons = styled.div`
  display: flex;
  gap: 0.25rem;
  align-self: flex-end;
  align-items: center;
`;

const CartProduct = ({ orderItem }) => {
  const [deleteItemFromOrder] = useDDMutation(mutations.DeleteItemFromOrder);
  const [updateItemInOrder] = useDDMutation(mutations.UpdateItemInOrder);
  const [quantity, setQuantity] = useState();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (orderItem && orderItem.quantity) setQuantity(orderItem.quantity);
  }, [orderItem, setQuantity]);

  const handleQuantityPlusClick = () => {
    setIsSaveDisabled(false);
    setQuantity(quantity + 1);
  };
  const handleQuantityMinusClick = () => {
    setIsSaveDisabled(false);
    setQuantity(quantity - 1);
  };

  const handleSave = async (event) => {
    try {
      event.preventDefault();
      await updateItemInOrder({
        variables: {
          id: orderItem.id,
          quantity
        }
      });
      setIsSaveDisabled(true);
    } catch (err) {
      console.log('Failed to update item in order');
    }
  };

  const handleRemoveItem = async () => {
    try {
      await deleteItemFromOrder({
        variables: { id: orderItem.id }
      });
    } catch (err) {
      console.log('Failed to delete item from order');
    }
  };
  return (
    orderItem.product
      ? <CartLine>
        <ProductDetailsWrapper>
          <h6>{orderItem.product.name}</h6>
          <h6><strong>£{orderItem.product.price}</strong></h6>
        </ProductDetailsWrapper>
        <CartDetailsWrapper>
          <h6>Quantity: <strong>{quantity}</strong></h6>
        </CartDetailsWrapper>
        <CartLine>
          <EditButtons>
            <IoAddCircleOutline style={{ fontSize: '1.75rem' }} onClick={handleQuantityPlusClick} />
            <IoRemoveCircleSharp style={{ fontSize: '1.75rem' }} onClick={handleQuantityMinusClick} />
            <IoTrashOutline style={{ fontSize: '1.75rem' }} onClick={handleRemoveItem} />
            <ActionButton text='Save' onClick={handleSave} disabled={isSaveDisabled} />
          </EditButtons>
        </CartLine>
        </CartLine>
      : null
  );
};

CartProduct.propTypes = {
  orderItem: PropTypes.object.isRequired
};

export default CartProduct;
