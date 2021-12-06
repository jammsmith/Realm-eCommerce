// External imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
const { darkFade, dark } = colours;

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

const ProductLink = styled(Link)`
  color: ${dark};
`;

const CartProduct = ({ order, orderItem }) => {
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

  // Handlers
  const handleIncreaseQuantityClick = () => {
    setIsSaveDisabled(false);
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantityClick = () => {
    setIsSaveDisabled(false);
    setQuantity(quantity - 1);
  };

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

  const [deleteOrderItem] = useDDMutation(mutations.DeleteOrderItem);
  const [updateOrderItemsArrayInOrder] = useDDMutation(mutations.UpdateOrderItemsArrayInOrder);

  const handleRemoveItem = async () => {
    const updatedOrderItems = order.orderItems.filter(item => item.orderItem_id !== orderItem.orderItem_id);
    const orderItemIds = updatedOrderItems.map(item => item.orderItem_id);

    try {
      await deleteOrderItem({
        variables: {
          orderItem_id: orderItem.orderItem_id
        }
      });
      await updateOrderItemsArrayInOrder({
        variables: {
          order_id: order.order_id,
          updatedOrderItemsArray: orderItemIds
        }
      });
    } catch (err) {
      console.log('Failed to delete item from order');
    }
  };

  const { product } = orderItem;
  return (
    orderItem.product
      ? <CartLine>
        <SectionSpacer light />
        <DetailsWrapper>
          <ProductDetailsWrapper>
            <ProductLink to={`/shop/${product.category}/${product.subCategory}/${product._id}`}>
              <h6>{orderItem.product.name}</h6>
            </ProductLink>
            <h6 style={{ fontSize: '0.75rem' }}>Unit Price: £{product.price}</h6>
          </ProductDetailsWrapper>
          <Divider />
          <CartDetailsWrapper>
            <h6>x {quantity}</h6>
            <h6>£{productTotal}</h6>
          </CartDetailsWrapper>
        </DetailsWrapper>
        <CartLine>
          <EditButtons>
            <IoAddCircleOutline
              name='increase-quantity'
              style={{ fontSize: '1.75rem' }}
              onClick={handleIncreaseQuantityClick}
            />
            <IoRemoveCircleSharp
              name='descrease-quantity'
              style={{ fontSize: '1.75rem' }}
              onClick={handleDecreaseQuantityClick}
            />
            <IoTrashOutline
              name='remove-item'
              onClick={handleRemoveItem}
              style={{ fontSize: '1.75rem' }}
            />
            <ActionButton text='Save' onClick={handleSave} disabled={isSaveDisabled} />
          </EditButtons>
        </CartLine>
        </CartLine>
      : null
  );
};

CartProduct.propTypes = {
  order: PropTypes.object.isRequired,
  orderItem: PropTypes.object.isRequired
};

export default CartProduct;
