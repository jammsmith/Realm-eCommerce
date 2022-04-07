import React, { useEffect, useState, useContext } from 'react';
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
import { getCartSubTotal } from '../../../helpers/cart.js';
import { RealmAppContext } from '../../../realmApolloClient.js';

// Setup stripe
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51JssHLK4OzaV2zFUvwSBOreLFJyb8YuJT6rZheUc4MkBtGeMj9ZrqNd3mQebbi9nnLcGkLjqDaCMFwtT5KyjuBmN00M3I7Ekl1');

const Shop = () => {
  const app = useContext(RealmAppContext);
  const [activeOrder, setActiveOrder] = useState();
  const [addingToCart, setAddingToCart] = useState({
    isLoading: false,
    productId: ''
  });

  useEffect(() => {
    const { dbUser } = app.currentUser;
    if (dbUser && !activeOrder) {
      if (dbUser.orders && dbUser.orders.length) {
        const order = dbUser.orders.find(order => order.orderStatus === 'pendingInCart');
        if (order && order.orderItems && order.orderItems.length) {
          const subTotal = getCartSubTotal(order);
          setActiveOrder({ ...order, subTotal });
        } else {
          setActiveOrder({});
        }
      }
    }
  }, [app.currentUser, activeOrder]);

  // Handlers
  const updateCurrentUser = async (user) => {
    await app.setCurrentUser(prev => ({ ...prev, dbUser: user }));
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
    activeOrder: activeOrder,
    updateActiveOrder,
    addingToCart,
    updateAddingToCart,
    updateCurrentUser,
    currentUser: app.currentUser
  };

  return (
    app.currentUser && app.currentUser.dbUser
      ? <>
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
            path='/shop/cart'
            render={() =>
              <Cart
                activeOrder={activeOrder}
                updateActiveOrder={updateActiveOrder}
              />}
          />
          <Route
            exact
            path='/shop/checkout'
            render={() =>
              <Checkout
                stripePromise={stripePromise}
                activeOrder={activeOrder}
                updateActiveOrder={updateActiveOrder}
              />}
          />
        </Switch>
        <SectionSpacer spaceBelow />
        </>
      : null
  );
};

export default Shop;
