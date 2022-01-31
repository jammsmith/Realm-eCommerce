// External imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline, IoMailOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import uniqueString from 'unique-string';

// Components
import ActionButton from './ActionButton.js';
import ProgressSpinner from './ProgressSpinner.js';

//
import mutations from '../graphql/mutations.js';
import useDDMutation from '../hooks/useDDMutation.js';

// Styles
import fonts from '../styles/fonts.js';
import colours from '../styles/colours.js';

const { standard } = fonts;
const { dark, light } = colours;

//
const AddToCart = ({
  product,
  itemsInCart,
  activeOrder,
  updateActiveOrder,
  addingToCart,
  updateAddingToCart,
  currentUser,
  updateCurrentUser
}) => {
  const history = useHistory();
  const [productInCart, setProductInCart] = useState(false);
  const [buttonText, setButtonText] = useState('');

  const isLoading = addingToCart.isLoading && addingToCart.productId === product.product_id;

  useEffect(() => {
    if (itemsInCart) {
      const found = itemsInCart.find(item => item.product._id === product._id);
      if (found) setProductInCart(true);
    }
  }, [itemsInCart, setProductInCart, product]);

  // Custom styles for button
  const styles = {
    fontFamily: standard,
    background: dark,
    color: light,
    width: '100%'
  };
  //

  useEffect(() => {
    if (productInCart) {
      setButtonText('Added - View in Cart');
    } else if (product.numInStock > 0) {
      setButtonText(
        <>
          Add To Cart
          <IoCartOutline />
        </>);
    } else {
      setButtonText(
        <>
        Request this product
          <IoMailOutline />
        </>);
    }
  }, [setButtonText, productInCart, product, itemsInCart]);

  // Order mutations
  const [createGuestOrder] = useDDMutation(mutations.CreateGuestOrder);
  const [createOrderForExistingCustomer] = useDDMutation(mutations.CreateOrderForExistingCustomer);
  const [createNewOrderItem] = useDDMutation(mutations.CreateNewOrderItem);
  const [updateOrderItemsInOrder] = useDDMutation(mutations.UpdateOrderItemsInOrder);
  const [updateUserOrders] = useDDMutation(mutations.UpdateUserOrders);

  const handleAddToCart = async (event) => {
    const productId = event.currentTarget.value;
    // -- Current user with an active order -- //
    if (currentUser && currentUser.user_id && activeOrder) {
      try {
        updateAddingToCart(true, productId);
        const newOrderItemId = `orderItem-${await uniqueString()}`;
        await createNewOrderItem({
          variables: {
            orderItem_id: newOrderItemId,
            order_id: activeOrder.order_id,
            product_id: productId
          }
        });
        const orderItemIds = activeOrder.orderItems.map(item => item.orderItem_id);
        orderItemIds.push(newOrderItemId);
        const { data } = await updateOrderItemsInOrder({
          variables: {
            order_id: activeOrder.order_id,
            orderItems: orderItemIds
          }
        });
        updateActiveOrder(data.updateOneOrder);
        updateAddingToCart(false);
      } catch (err) {
        throw new Error(`Failed to add item to existing order. Error: ${err}`);
      }
    }

    // -- Current user with no active order -- //
    if (currentUser && currentUser.user_id && !activeOrder) {
      try {
        updateAddingToCart(true, productId);
        const newOrderId = `order-${await uniqueString()}`;
        const newOrderItemId = `orderItem-${await uniqueString()}`;
        const { data } = await createOrderForExistingCustomer({
          variables: {
            order_id: newOrderId,
            user_id: currentUser.user_id,
            orderItem_id: newOrderItemId,
            product_id: productId,
            dateCreated: new Date(Date.now())
          }
        });
        const existingOrderIds =
          data.insertOneOrder.customer.orders.map(order => order.order_id);
        await updateUserOrders({
          variables: {
            user_id: currentUser.user_id,
            orders: [...existingOrderIds, newOrderId]
          }
        });
        updateActiveOrder(data.insertOneOrder);
        updateAddingToCart(false);
      } catch (err) {
        throw new Error(`Failed to add new order for existing customer. Error: ${err}`);
      }
    }

    // -- No current logged in user -- //
    if (currentUser && !currentUser.user_id) {
      try {
        updateAddingToCart(true, productId);
        const newOrderId = `order-${await uniqueString()}`;
        const newOrderItemId = `orderItem-${await uniqueString()}`;
        const newUserId = `user-${await uniqueString()}`;
        const { data } = await createGuestOrder({
          variables: {
            order_id: newOrderId,
            user_ObjectId: currentUser.id,
            user_id: newUserId,
            orderItem_id: newOrderItemId,
            product_id: productId,
            dateCreated: new Date(Date.now())
          }
        });
        updateActiveOrder(data.insertOneOrder.customer.orders[0]);
        updateCurrentUser(data.insertOneOrder.customer);
        updateAddingToCart(false);
      } catch (err) {
        throw new Error(`Failed to create guest order. Error: ${err}`);
      }
    }
  };

  return (
    product.numInStock > 0
      ? <ActionButton
        text={isLoading ? <ProgressSpinner colour='light' size='1.5rem' /> : buttonText}
        onClick={productInCart ? () => history.push('/shop/cart') : handleAddToCart}
        name='addToCart'
        value={product.product_id}
        variant='contained'
        customStyles={styles}
        disabled={isLoading}
        />
      : <ActionButton
        text={buttonText}
        customStyles={styles}
        onClick={() => history.push('/contact-us')}
        />
  );
};

AddToCart.propTypes = {
  product: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  addingToCart: PropTypes.object.isRequired,
  updateAddingToCart: PropTypes.func.isRequired,
  activeOrder: PropTypes.object,
  updateActiveOrder: PropTypes.func.isRequired,
  itemsInCart: PropTypes.array
};

export default AddToCart;
