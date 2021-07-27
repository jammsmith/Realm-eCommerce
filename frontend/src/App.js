import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AboutUs from './client/views/AboutUs';
import ContactUs from './client/views/ContactUs';
import Home from './client/views/Home';
import Shop from './client/views/Shop';
import ShopCategory from './client/views/ShopCategory';
import Product from './client/views/Product';

import Navbar from './client/components/Navbar/Navbar';
import SideDrawer from './client/components/SideDrawer/SideDrawer';
import BackgroundShadow from './client/components/BackgroundShadow/BackgroundShadow';
import Footer from './client/components/Footer';

const App = () => {
  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const toggleHandler = () => setMenuInView(prevValue => !prevValue);
  const closeMenu = () => setMenuInView(false);

  let sideDrawer;
  let backgroundShadow;

  if (menuInView) {
    sideDrawer = (
      <SideDrawer show={menuInView} handleDrawerLinkClick={closeMenu} />
    );
    backgroundShadow = <BackgroundShadow handleBackgroundClick={closeMenu} />;
  }
  // end

  return (
    <Router>
      <Navbar handleToggleClick={toggleHandler} />
      {sideDrawer}
      {backgroundShadow}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/shop' component={Shop} />
        <Route path='/shop/:category' component={ShopCategory} />
        <Route path='shop/:category/:product' component={Product} />
        <Route path='/about-us' component={AboutUs} />
        <Route path='/contact-us' component={ContactUs} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
