import React, { useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import Categories from './Categories.js';
import SubCategories from './SubCategories.js';
import Products from './Products.js';
import Product from './Product/Product.js';
import Cart from './Cart/Cart.js';
import Checkout from './Checkout/Checkout.js';
import Summary from './Checkout/Summary.js';
import SectionSpacer from '../../../Components/SectionSpacer.js';
import { RealmAppContext } from '../../../realmApolloClient.js';
import { CurrencyContext } from '../../../context/CurrencyContext.js';
import useScrollToTop from '../../../hooks/useScrollToTop.js';
import { getEnvVar } from '../../../helpers/env.js';

const stripeKey = getEnvVar('STRIPE_PRIMARY_KEY');
const stripePromise = loadStripe(stripeKey);

const Shop = () => {
  useScrollToTop();

  const app = useContext(RealmAppContext);
  const { currency } = useContext(CurrencyContext);

  const [addingToCart, setAddingToCart] = useState({
    isLoading: false,
    productId: ''
  });

  // Handlers
  const updateCurrentUser = async (user) => {
    await app.setCurrentUser(prev => ({ ...prev, dbUser: user }));
  };
  const updateAddingToCart = (isLoading, productId) => {
    setAddingToCart({
      isLoading,
      productId
    });
  };

  // Accumulate add to cart props into single object
  const props = {
    addingToCart,
    updateAddingToCart,
    updateCurrentUser,
    currentUser: app.currentUser,
    currency
  };

  return (
    app.currentUser && app.currentUser.dbUser ? (
      <>
        <Switch>
          <Route exact path='/shop' component={Categories} />
          <Route
            exact
            path='/shop/browse'
            component={Categories}
          />
          <Route
            exact
            path='/shop/browse/:category'
            component={SubCategories}
          />
          <Route
            exact
            path='/shop/browse/:category/:subCategory'
            render={() => <Products {...props} />}
          />
          <Route
            exact
            path='/shop/browse/:category/:subCategory/:productId'
            render={() => <Product {...props} />}
          />
          <Route
            exact
            path='/shop/cart'
            component={Cart}
          />
          <Route
            exact
            path='/shop/checkout'
            render={() => <Checkout stripePromise={stripePromise} />}
          />
          <Route
            exact
            path='/shop/checkout/summary'
            component={Summary}
          />
        </Switch>
        <SectionSpacer spaceBelow />
      </>
    ) : null
  );
};

export default Shop;
