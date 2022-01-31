import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// Views
import Home from '../Home/Home.js';
import Category from './Category';
import SubCategory from './SubCategory';
import Product from './Product';

// Components
import SectionSpacer from '../../../Components/SectionSpacer.js';

// Other
import useCurrentUser from '../../../hooks/useCurrentUser.js';
import useActiveOrder from '../../../hooks/useActiveOrder.js';

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
      <Router>
        <Switch>
          <Route exact path='/shop' component={Home} />
          <Route
            exact
            path='/shop/:category'
            component={Category}
          />
          <Route
            exact
            path='/shop/:category/:subCategory'
            render={() => <SubCategory {...props} />}
          />
          <Route
            exact
            path='/shop/:category/:subCategory/:productId'
            render={() => <Product {...props} />}
          />
        </Switch>
      </Router>
      <SectionSpacer spaceBelow />
    </>
  );
};

export default Shop;
