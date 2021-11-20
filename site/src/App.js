import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Apollo / Realm
import { ApolloProvider } from '@apollo/client';
import client, { RealmAppProvider } from './realmApolloClient.js';

// Main views
import Home from './Views/Client/Home/Home.js';
import Shop from './Views/Client/Shop/Shop.js';
import Cart from './Views/Client/Shop/Cart/Cart.js';
import Checkout from './Views/Client/Shop/Checkout/Checkout.js';
import AboutUs from './Views/Client/AboutUs/AboutUs.js';
import ContactUs from './Views/Client/ContactUs/ContactUs.js';
import Error404 from './Views/Error/Error404.js';

// Global components
import Navbar from './Components/Navbar/Navbar';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import BackgroundShadow from './Components/BackgroundShadow/BackgroundShadow';
import Footer from './Components/Footer/Footer.js';

// Stripe Instance
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe('pk_test_51JssHLK4OzaV2zFUvwSBOreLFJyb8YuJT6rZheUc4MkBtGeMj9ZrqNd3mQebbi9nnLcGkLjqDaCMFwtT5KyjuBmN00M3I7Ekl1');

const App = () => {
  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const toggleHandler = () => setMenuInView(prevValue => !prevValue);
  const closeMenu = () => setMenuInView(false);
  // Stripe setup -->
  // const options = {
  //   clientSecret: 'sk_test_51JssHLK4OzaV2zFU3rKfTerqgOHjFTOf71gAedWEzLRTWg5ukgHA00xXyrH31uiiKPZ3EgZ2NiaxtsMRsgJkas1Z00yIQqdI20'
  // };
  return (
    <RealmAppProvider>
      <ApolloProvider client={client}>
        {/* <Elements stripe={stripePromise} options={options}> */}
        <Router>
          <Navbar handleToggleClick={toggleHandler} />
          {
            menuInView &&
              <>
                <SideDrawer show={menuInView} handleDrawerLinkClick={closeMenu} />
                <BackgroundShadow handleBackgroundClick={closeMenu} />
              </>
          }
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/shop/:category/:subCategory?/:productId?' component={Shop} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/about-us' component={AboutUs} />
            <Route exact path='/contact-us' component={ContactUs} />
            <Route path='/' component={Error404} />
          </Switch>
          <Footer />
        </Router>
        {/* </Elements> */}
      </ApolloProvider>
    </RealmAppProvider>
  );
};

export default App;
