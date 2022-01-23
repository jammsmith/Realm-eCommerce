// External imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// GraphQL
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';

// Components
import ActionButton from '../../../../Components/ActionButton.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';

// Styled Components
import {
  CartLine,
  DetailsWrapper,
  ProductDetailsWrapper,
  CartDetailsWrapper,
  Divider,
  EditButtonsWrapper,
  IncreaseQuantityButton,
  DecreaseQuantityButton,
  RemoveItemButton,
  ProductLink
} from './StyledComponents.js';

// A single product item inside the cart
const CartProduct = ({ order, orderItem, isMinimised }) => {
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
      throw new Error('Failed to update item in order');
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
      throw new Error('Failed to delete item from order');
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
        {
          !isMinimised &&
            <CartLine>
              <EditButtonsWrapper>
                <IncreaseQuantityButton onClick={handleIncreaseQuantityClick} />
                <DecreaseQuantityButton onClick={handleDecreaseQuantityClick} />
                <RemoveItemButton onClick={handleRemoveItem} />
                <ActionButton text='Save' onClick={handleSave} disabled={isSaveDisabled} />
              </EditButtonsWrapper>
            </CartLine>
        }
        </CartLine>
      : null
  );
};

CartProduct.propTypes = {
  order: PropTypes.object.isRequired,
  orderItem: PropTypes.object.isRequired,
  isMinimised: PropTypes.bool
};

export default CartProduct;
