// External imports
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline, IoCheckmarkSharp } from 'react-icons/io5';

// GraphQL
import useDDMutation from '../../hooks/useDDMutation.js';
import mutations from '../../graphql/mutations.js';

// Components
import { CurrentUserContext } from '../../context/currentUserContext.js';
import ActionButton from '../ActionButton.js';

// Styles
import fonts from '../../styles/fonts.js';
import colours from '../../styles/colours.js';

const { standard } = fonts;
const { dark, light } = colours;

//
const AddToCart = ({ product }) => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [isItemAddedToCart, setIsItemAddedToCart] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const [addUser] = useDDMutation(mutations.AddUser);
  const [addOrder] = useDDMutation(mutations.AddOrder);
  const [addItemToOrder] = useDDMutation(mutations.AddItemToOrder);

  // Set existing order if there is one
  useEffect(() => {
    if (currentUser && currentUser.orders && currentUser.orders.length > 0) {
      const foundActiveOrder = currentUser.orders.find(item => item.isPendingInCheckout === true);
      if (foundActiveOrder) setActiveOrder(foundActiveOrder);
    }
  }, [currentUser]);

  // Custom styles for button
  const styles = {
    fontFamily: standard,
    background: dark,
    color: light,
    width: '100%'
  };

  const handleAddToCart = async () => {
    // -- Current user with an active order -- /
    if (currentUser && currentUser.id && activeOrder) {
      try {
        const response = await addItemToOrder({
          variables: {
            orderId: activeOrder.id,
            productId: product.id,
            quantity: 1
          }
        });
        if (response.data.addItemToOrder) {
          setIsItemAddedToCart(true);
          console.log('Added item to existing order', response.data.addItemToOrder);
        }
      } catch (err) {
        console.log('Failed to add item to existing order. Error:', err);
      }
    }

    // -- Current user with no active order -- //
    if (currentUser && currentUser.id && !activeOrder) {
      try {
        let response = await addOrder({ variables: { customerId: currentUser.id } });
        response = await addItemToOrder({
          variables: {
            orderId: response.data.addOrder.id,
            productId: product.id,
            quantity: 1
          }
        });
        if (response.data.addItemToOrder) {
          setActiveOrder(response.data.addItemToOrder.order);
          setIsItemAddedToCart(true);
          console.log('Added new order and order item for existing customer', response.data.addItemToOrder);
        }
      } catch (err) {
        console.log('Failed to add new order for existing customer. Error:', err);
      }
    }

    // -- No current user -- //
    if (currentUser && !currentUser.id) {
      try {
        let response = await addUser();
        const guestUser = response.data.addUser;
        window.localStorage.setItem('currentUser', JSON.stringify(guestUser));
        setCurrentUser(guestUser);
        response = await addOrder({ variables: { customerId: guestUser.id } });
        response = await addItemToOrder({
          variables: {
            orderId: response.data.addOrder.id,
            productId: product.id,
            quantity: 1,
            size: 'test'
          }
        });
        if (response.data.addItemToOrder) {
          setActiveOrder(response.data.addItemToOrder.order);
          setIsItemAddedToCart(true);
          console.log('Added new order and order item for a new localStorage customer', response.data.addItemToOrder);
        }
      } catch (err) {
        console.log('Failed to create guest order. Error:', err);
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
