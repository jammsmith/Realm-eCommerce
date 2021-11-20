// External imports
import React, { useContext, useState, useEffect } from 'react';
import { Credentials } from 'realm-web';
import PropTypes from 'prop-types';
import { IoCartOutline, IoCheckmarkSharp } from 'react-icons/io5';

// GraphQL
import useDDMutation from '../../hooks/useDDMutation.js';
import mutations from '../../graphql/mutations.js';

// Components
import ActionButton from '../ActionButton.js';

// Helpers / hooks
import { getActiveOrderFromUser } from '../../helpers/user.js';
import { RealmAppContext } from '../../realmApolloClient.js';

// Styles
import fonts from '../../styles/fonts.js';
import colours from '../../styles/colours.js';

const { standard } = fonts;
const { dark, light } = colours;

//
const AddToCart = ({ product }) => {
  const app = useContext(RealmAppContext);
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  console.log('app.currentUser', app.currentUser);
  console.log('currentUser', currentUser);

  const [isItemAddedToCart, setIsItemAddedToCart] = useState(false);
  const [activeOrder, setActiveOrder] = useState();

  const [createGuestOrder] = useDDMutation(mutations.CreateGuestOrder);
  // const [addOrder] = useDDMutation(mutations.AddOrder);
  // const [addItemToOrder] = useDDMutation(mutations.AddItemToOrder);

  // useEffect(() => {
  //   // Get the active order if the user has one
  //   setActiveOrder(getActiveOrderFromUser(currentUser));
  // }, [currentUser]);

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
    if (currentUser && currentUser.type && activeOrder) {
      try {
        console.log('currentUser && currentUser.id && activeOrder');
        // const response = await addItemToOrder({
        //   variables: {
        //     orderId: activeOrder.id,
        //     productId: product.id,
        //     quantity: 1
        //   }
        // });
        // if (response.data.addItemToOrder) {
        //   setIsItemAddedToCart(true);
        //   console.log('Added item to existing order', response.data.addItemToOrder);
        // }
      } catch (err) {
        console.log('Failed to add item to existing order. Error:', err);
      }
    }

    // -- Current user with no active order -- //
    if (currentUser && currentUser.type && !activeOrder) {
      try {
        console.log('currentUser && currentUser.id && !activeOrder');
        // const response = await addOrder({ variables: { order_id: '12345' } });
        // console.log('response from addOrder', addOrder);
        // response = await addItemToOrder({
        //   variables: {
        //     orderId: response.data.addOrder.id,
        //     productId: product.id,
        //     quantity: 1
        //   }
        // });
        // if (response.data.addItemToOrder) {
        //   setActiveOrder(response.data.addItemToOrder.order);
        //   setIsItemAddedToCart(true);
        //   console.log('Added new order and order item for existing customer', response.data.addItemToOrder);
        // }
      } catch (err) {
        console.log('Failed to add new order for existing customer. Error:', err);
      }
    }
    //
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
        setCurrentUser(response.data.insertOneOrder.customer);
        setActiveOrder(response.data.insertOneOrder);
        setIsItemAddedToCart(true);
        console.log('Added new guest order');
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
