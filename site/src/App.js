import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Main views
import Home from './Views/Client/Home/Home.js';
import Shop from './Views/Client/Shop/Shop.js';
import Basket from './Views/Client/Shop/Basket.js';
import AboutUs from './Views/Client/AboutUs/AboutUs.js';
import ContactUs from './Views/Client/ContactUs/ContactUs.js';
import Error404 from './Views/Error/Error404.js';

// Global components
import Navbar from './Components/Navbar/Navbar';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import BackgroundShadow from './Components/BackgroundShadow/BackgroundShadow';
import Footer from './Components/Footer/Footer.js';

// Apollo instance
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const toggleHandler = () => setMenuInView(prevValue => !prevValue);
  const closeMenu = () => setMenuInView(false);

  return (
    <ApolloProvider client={client}>
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
          <Route exact path='/basket' component={Basket} />
          <Route exact path='/about-us' component={AboutUs} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route path='/' component={Error404} />
        </Switch>
        <Footer />
      </Router>
    </ApolloProvider>
  );
};

export default App;
