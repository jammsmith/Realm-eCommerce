import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import ActionButton from '../../../../Components/ActionButton.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';
import { getPriceInCurrency, getCurrencySymbol } from '../../../../helpers/price.js';
import { CurrencyContext } from '../../../../context/CurrencyContext.js';
import { OrderContext } from '../../../../context/OrderContext.js';

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
const CartProduct = ({ orderItem, isMinimised }) => {
  const { activeOrder, setActiveOrder } = useContext(OrderContext);
  const { currency } = useContext(CurrencyContext);

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [quantity, setQuantity] = useState();
  const [productTotal, setProductTotal] = useState();

  useEffect(() => {
    if (orderItem && orderItem.quantity) {
      setQuantity(orderItem.quantity);
      setProductTotal(() => orderItem.quantity * orderItem.product[`price${currency}`]);
    }
  }, [orderItem, setQuantity, currency]);

  useEffect(() => {
    setProductTotal(quantity * orderItem.product[`price${currency}`]);
  }, [quantity, orderItem, setProductTotal, currency]);

  // Handlers
  const handleIncreaseQuantityClick = () => {
    setIsSaveDisabled(false);
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantityClick = () => {
    setIsSaveDisabled(false);
    if (quantity !== 0) {
      setQuantity(quantity - 1);
    }
  };

  const [deleteOrderItem] = useDDMutation(mutations.DeleteOrderItem);
  const [updateOrderItemsInOrder] = useDDMutation(mutations.UpdateOrderItemsInOrder);
  const [updateItemInOrder] = useDDMutation(mutations.UpdateItemInOrder);

  const handleRemoveItem = async () => {
    const updatedOrderItems = activeOrder.orderItems.filter(item => item.orderItem_id !== orderItem.orderItem_id);
    const orderItemIds = updatedOrderItems.map(item => item.orderItem_id);

    try {
      await deleteOrderItem({
        variables: {
          orderItem_id: orderItem.orderItem_id
        }
      });
      const { data } = await updateOrderItemsInOrder({
        variables: {
          order_id: activeOrder.order_id,
          orderItems: orderItemIds
        }
      });
      setActiveOrder(data.updateOneOrder);
    } catch (err) {
      throw new Error('Failed to delete item from order');
    }
  };

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      if (quantity !== 0) {
        const { data } = await updateItemInOrder({
          variables: {
            id: orderItem._id,
            quantity
          }
        });
        setActiveOrder(data.updateOneOrderItem.order);
      } else {
        handleRemoveItem();
      }
      setIsSaveDisabled(true);
    } catch (err) {
      throw new Error('Failed to update item in order');
    }
  };

  const { product } = orderItem;
  return (
    product ? (
      <CartLine>
        <SectionSpacer light />
        <DetailsWrapper>
          <ProductDetailsWrapper>
            <ProductLink to={`/shop/browse/${product.category}/${product.subCategory}/${product._id}`}>
              <h6>{product.name}</h6>
            </ProductLink>
            <h6 style={{ fontSize: '0.75rem' }}>Unit Price: {getPriceInCurrency(product, currency)}</h6>
          </ProductDetailsWrapper>
          <Divider />
          <CartDetailsWrapper>
            <h6>x {quantity}</h6>
            <h6>{`${getCurrencySymbol(currency)}${productTotal}`}</h6>
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
    ) : null
  );
};

CartProduct.propTypes = {
  orderItem: PropTypes.object.isRequired,
  isMinimised: PropTypes.bool
};

export default CartProduct;
