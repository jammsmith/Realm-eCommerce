import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// Views
import Home from '../Home/Home.js';
import Category from './Category';
import SubCategory from './SubCategory';
import Product from './Product';
import Cart from './Cart/Cart.js';
import Checkout from './Checkout/Checkout.js';

// Components
import SectionSpacer from '../../../Components/SectionSpacer.js';

// Other
import useCurrentUser from '../../../hooks/useCurrentUser.js';
import useActiveOrder from '../../../hooks/useActiveOrder.js';

// Setup stripe
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51JssHLK4OzaV2zFUvwSBOreLFJyb8YuJT6rZheUc4MkBtGeMj9ZrqNd3mQebbi9nnLcGkLjqDaCMFwtT5KyjuBmN00M3I7Ekl1');

const Shop = () => {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [activeOrder, setActiveOrder] = useActiveOrder();
  const [itemsInCart, setItemsInCart] = useState();
  const [addingToCart, setAddingToCart] = useState({
    isLoading: false,
    productId: ''
  });

  // Get items currently in cart and send down to product tiles
  useEffect(() => {
    if (activeOrder && activeOrder.orderItems && activeOrder.orderItems !== itemsInCart) {
      setItemsInCart(activeOrder.orderItems);
    }
  }, [activeOrder, itemsInCart, setItemsInCart]);

  // Handlers
  const updateCurrentUser = (user) => {
    setCurrentUser(user);
  };
  const updateActiveOrder = (order) => {
    setActiveOrder(order);
  };
  const updateAddingToCart = (isLoading, productId) => {
    setAddingToCart({
      isLoading,
      productId
    });
  };

  // Accumulate add to cart props into single object
  const props = {
    activeOrder,
    updateActiveOrder,
    itemsInCart,
    addingToCart,
    updateAddingToCart,
    currentUser,
    updateCurrentUser
  };

  return (
    <>
      <SectionSpacer dark spaceBelow />
      <Switch>
        <Route exact path='/shop' component={Home} />
        <Route
          exact
          path='/shop/browse/:category'
          component={Category}
        />
        <Route
          exact
          path='/shop/browse/:category/:subCategory'
          render={() => <SubCategory {...props} />}
        />
        <Route
          exact
          path='/shop/browse/:category/:subCategory/:productId'
          render={() => <Product {...props} />}
        />
        <Route
          exact
          path='/shop/checkout'
          render={() => <Checkout stripePromise={stripePromise} />}
        />
        <Route exact path='/shop/cart' component={Cart} />
      </Switch>
      <SectionSpacer spaceBelow />
    </>
  );
};

export default Shop;
