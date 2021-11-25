// External imports
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline, IoCheckmarkSharp } from 'react-icons/io5';

// GraphQL
import useDDMutation from '../../hooks/useDDMutation.js';
import mutations from '../../graphql/mutations.js';

// Components
import ActionButton from '../ActionButton.js';

// Other
import useCurrentUser from '../../hooks/useCurrentUser.js';

// Styles
import fonts from '../../styles/fonts.js';
import colours from '../../styles/colours.js';

const { standard } = fonts;
const { dark, light } = colours;

//
const AddToCart = ({ product }) => {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const activeOrder = useRef(null);
  const [isItemAddedToCart, setIsItemAddedToCart] = useState(false);

  //
  useEffect(() => {
    if (currentUser && currentUser.orders && currentUser.orders.length) {
      const response = currentUser.orders.find(order => order.isPendingInCheckout === true);
      if (response) activeOrder.current = response;
    }
  }, [currentUser]);

  //
  useEffect(() => {
    // test setCurrentUser to see if it activates useEffect inside the hook
    console.log('--------> currentUser', currentUser);
    console.log('--------> setCurrentUser', setCurrentUser);
  }, [currentUser]);
  //
  useEffect(() => {
    console.log('isItemAddedToCart', isItemAddedToCart);
  }, [isItemAddedToCart]);
  //
  useEffect(() => {
    console.log('activeOrder.current', activeOrder.current);
  }, [activeOrder]);

  const [createGuestOrder] = useDDMutation(mutations.CreateGuestOrder);
  const [createOrderForExistingCustomer] = useDDMutation(mutations.CreateOrderForExistingCustomer);
  const [addItemToExistingOrder] = useDDMutation(mutations.AddItemToExistingOrder);

  // useEffect(() => {
  //   // Check if product is already part of the active order
  //   if (activeOrder && activeOrder.orderItems) {
  //     const foundOrderItem = activeOrder.orderItems.find(item => item.product.id === product.id);
  //     if (foundOrderItem) setIsItemAddedToCart(true);
  //   }
  // }, [activeOrder, product, setIsItemAddedToCart]);

  // Custom styles for button
  const styles = {
    fontFamily: standard,
    background: dark,
    color: light,
    width: '100%'
  };

  const handleAddToCart = async () => {
    // -- Current user with an active order -- /
    if (currentUser && currentUser.type && activeOrder.current) {
      try {
        const response = await addItemToExistingOrder({
          variables: {
            orderItem_id: 'orderItem-004',
            order_id: activeOrder.current.order_id,
            product_id: 'combos--0002'
          }
        });
        activeOrder.current = response.data.insertOneOrder;
        setIsItemAddedToCart(true);
        console.log('Added new item to existing order');
      } catch (err) {
        console.log('Failed to add item to existing order. Error:', err);
      }
    }

    // -- Current user with no active order -- //
    if (currentUser && currentUser.type && !activeOrder.current) {
      try {
        console.log('currentUser && currentUser.id && !activeOrder.current');
        const response = await createOrderForExistingCustomer({
          variables: {
            orderId: '12345',
            userId: currentUser.user_id,
            orderItemId: '67890',
            productId: 'spur-straps-and-cuffs-sets--0006'
          }
        });
        activeOrder.current = response.data.insertOneOrder;
        setIsItemAddedToCart(true);
        console.log('Added new order and order item for existing customer');
      } catch (err) {
        console.log('Failed to add new order for existing customer. Error:', err);
      }
    }

    // -- No current logged in user -- //
    if (currentUser && !currentUser.type) {
      try {
        const response = await createGuestOrder({
          variables: {
            order_id: 'order-001',
            user_ObjectId: currentUser.id,
            user_id: 'user-001',
            orderItem_id: 'orderItem-001',
            product_id: 'gun-belts--0001'
          }
        });
        activeOrder.current = response.data.insertOneOrder;
        setIsItemAddedToCart(true);
        setCurrentUser(response.data.insertOneOrder.customer);
        console.log('Created new guest order');
      } catch (err) {
        throw new Error(`Failed to create guest order. Error: ${err}`);
      }
    }
  };

  //
  let addToCartText;
  if (product.numInStock > 0) {
    addToCartText =
      <>
        Add To Cart
        &nbsp;<IoCartOutline />
      </>;
  } else {
    addToCartText = 'Contact us to request this product';
  }
  const addedToCartText =
    <>
      Added to cart
      &nbsp; <IoCheckmarkSharp />
    </>;

  return (
    <ActionButton
      text={isItemAddedToCart ? addedToCartText : addToCartText}
      disabled={isItemAddedToCart && true}
      onClick={handleAddToCart}
      variant='contained'
      customStyles={styles}
    />
  );
};

AddToCart.propTypes = {
  product: PropTypes.object.isRequired
};

export default AddToCart;
