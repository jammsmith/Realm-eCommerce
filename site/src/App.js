import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Main views
import Home from './Views/Client/Home/Home.js';
import Shop from './Views/Client/Shop/Shop.js';
import AboutUs from './Views/Client/AboutUs/AboutUs.js';
import ContactUs from './Views/Client/ContactUs/ContactUs.js';
import Account from './Views/Client/Account/Account.js';
import Login from './Views/Client/Account/Login.js';
import Error404 from './Views/Error/Error404.js';

// Other
import Navbar from './Components/Navbar/Navbar';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import BackgroundShadow from './Components/BackgroundShadow/BackgroundShadow';
import Footer from './Components/Footer/Footer.js';
import PrivateRoute from './Components/PrivateRoute.js';
import { RealmAppContext } from './realmApolloClient.js';

const App = () => {
  const app = useContext(RealmAppContext);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (app && app.currentUser && app.currentUser.dbUser) {
      setAppReady(true);
    }
  }, [app]);

  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const handleToggle = () => setMenuInView(prevValue => !prevValue);
  const closeMenu = () => setMenuInView(false);

  return (
    appReady
      ? <Router>
        <Navbar handleToggle={handleToggle} />
        {
          menuInView &&
            <>
              <SideDrawer
                show={menuInView}
                handleDrawerLinkClick={closeMenu}
              />
              <BackgroundShadow handleBackgroundClick={closeMenu} />
            </>
        }
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about-us' component={AboutUs} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute
            exact
            path='/my-account'
            component={Account}
          />
          <Route path='/shop' component={Shop} />
          <Route path='/' component={Error404} />
        </Switch>
        <Footer />
      </Router>
      : null
  );
};

export default App;
