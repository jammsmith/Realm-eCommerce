// External imports
import React, { useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { IoCartOutline } from 'react-icons/io5';

// GraphQL
import useDDMutation from '../hooks/useDDMutation.js';
import mutations from '../graphql/mutations.js';

// Components
import { CurrentUserContext } from '../context/currentUserContext.js';
import DDModal from './DDModal.js';

// Styles
import fonts from '../styles/fonts.js';
import colours from '../styles/colours.js';

const { standard } = fonts;
const { dark, light } = colours;

//
const AddToCart = ({ product }) => {
  const [currentUser] = useContext(CurrentUserContext);
  const [isItemAddedToCart, setIsItemAddedToCart] = useState(false);
  const existingOrderId = useRef(null);

  const [addUser] = useDDMutation(mutations.AddUser);
  const [addOrder] = useDDMutation(mutations.AddOrder);
  const [addItemToOrder] = useDDMutation(mutations.AddItemToOrder);

  useEffect(() => {
    if (currentUser && currentUser.orders && currentUser.orders.length > 0) {
      const orderInCart = currentUser.orders.filter(item => item.isPendingInCheckout === true);
      existingOrderId.current = orderInCart[0].id;
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
    if (currentUser.id && existingOrderId.current) {
      try {
        const response = await addItemToOrder({
          variables: {
            orderId: existingOrderId.current,
            productId: product.id,
            quantity: 1
          }
        });
        if (response.data.AddItemToOrder) {
          setIsItemAddedToCart(true);
        }
      } catch (err) {
        console.log('Failed to add item to existing order. Error:', err);
      }
    }

    // -- Current user with no active order -- //
    if (currentUser.id && !existingOrderId.current) {
      try {
        let response = await addOrder({ variables: { customerId: currentUser.id } });
        response = await addItemToOrder({
          variables: {
            orderId: response.data.addOrder.id,
            productId: product.id,
            quantity: 1
          }
        });
        if (response.data.AddItemToOrder) {
          setIsItemAddedToCart(true);
        }
      } catch (err) {
        console.log('Failed to add new order for existing customer. Error:', err);
      }
    }

    // -- No current user -- //
    if (!currentUser.id) {
      try {
        let response = await addUser({ variables: { lastName: 'GUEST' } });
        const guestUser = response.data.addUser;
        window.localStorage.setItem('currentUser', JSON.stringify(guestUser));
        response = await addOrder({ variables: { customerId: guestUser.id } });
        response = await addItemToOrder({
          variables: {
            orderId: response.data.addOrder.id,
            productId: product.id,
            quantity: 1,
            size: 'test'
          }
        });
        if (response.data.AddItemToOrder) {
          setIsItemAddedToCart(true);
        }
      } catch (err) {
        console.log('Failed to create guest order. Error:', err);
      }
    }
  };

  //
  let addToCartText;
  if (product.numInStock > 0) {
    const text = 'Add To Cart';
    addToCartText =
      <>
        {text}&nbsp;
        <IoCartOutline />
      </>;
  } else {
    addToCartText = 'Contact us to request this product';
  }

  return (
    <Button onClick={handleAddToCart} variant='contained' style={styles}>
      {addToCartText}
    </Button>
  );
};

AddToCart.propTypes = {
  product: PropTypes.object.isRequired
};

export default AddToCart;
