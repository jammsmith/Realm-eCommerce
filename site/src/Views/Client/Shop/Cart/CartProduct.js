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
import SectionSpacer from '../../../../Components/SectionSpacer.js';

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

const DetailsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
`;

const CartDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 5rem;
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
`;

const Divider = styled.div`
  border-right: 0.05rem solid black;
  flex: 1;
`;

const EditButtons = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  align-self: center;
  align-items: center;
`;

const CartProduct = ({ orderItem }) => {
  // Track quantity changes
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [quantity, setQuantity] = useState();
  const [productTotal, setProductTotal] = useState();

  useEffect(() => {
    if (orderItem && orderItem.quantity) {
      setQuantity(orderItem.quantity);
      setProductTotal(() => orderItem.quantity * orderItem.product.price);
    }
  }, [orderItem, setQuantity]);

  useEffect(() => {
    setProductTotal(quantity * orderItem.product.price);
  }, [quantity, orderItem, setProductTotal]);

  const handleQuantityPlusClick = () => {
    setIsSaveDisabled(false);
    setQuantity(quantity + 1);
  };
  const handleQuantityMinusClick = () => {
    setIsSaveDisabled(false);
    setQuantity(quantity - 1);
  };

  // Handlers
  const [deleteOrderItem] = useDDMutation(mutations.DeleteOrderItem);
  const [updateItemInOrder] = useDDMutation(mutations.UpdateItemInOrder);

  const handleSave = async (event) => {
    try {
      event.preventDefault();
      await updateItemInOrder({
        variables: {
          id: orderItem._id,
          quantity
        }
      });
      setIsSaveDisabled(true);
    } catch (err) {
      console.log('Failed to update item in order');
    }
  };

  // NOTE: This should also remove the orderItem_id from the orderItems array in the order
  const handleRemoveItem = async () => {
    try {
      await deleteOrderItem({
        variables: { id: orderItem._id }
      });
    } catch (err) {
      console.log('Failed to delete item from order');
    }
  };
  return (
    orderItem.product
      ? <CartLine>
        <SectionSpacer light />
        <DetailsWrapper>
          <ProductDetailsWrapper>
            <h6>{orderItem.product.name}</h6>
            <h6 style={{ fontSize: '0.75rem' }}>Unit Price: £{orderItem.product.price}</h6>
          </ProductDetailsWrapper>
          <Divider />
          <CartDetailsWrapper>
            <h6>x {quantity}</h6>
            <h6>£{productTotal}</h6>
          </CartDetailsWrapper>
        </DetailsWrapper>
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
