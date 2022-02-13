import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Main views
import Home from './Views/Client/Home/Home.js';
import Shop from './Views/Client/Shop/Shop.js';
import AboutUs from './Views/Client/AboutUs/AboutUs.js';
import ContactUs from './Views/Client/ContactUs/ContactUs.js';
import MyAccount from './Views/Client/Account/MyAccount.js';
import Login from './Views/Client/Account/Login.js';
import Error404 from './Views/Error/Error404.js';

// Other
import Navbar from './Components/Navbar/Navbar';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import BackgroundShadow from './Components/BackgroundShadow/BackgroundShadow';
import Footer from './Components/Footer/Footer.js';
import PrivateRoute from './Components/PrivateRoute.js';
import { RealmAppContext } from './realmApolloClient.js';
import { USER_DETAILED } from './graphql/queries.js';
import useLazyQueryCallback from './hooks/useLazyQueryCallback.js';

const App = () => {
  // Make sure app.currentUser is an object that contains both realmAppUser & dbUser
  const app = useContext(RealmAppContext);
  const [callQuery] = useLazyQueryCallback(USER_DETAILED, userFromDb => {
    if (app.currentUser) {
      const { realmUser, dbUser } = app.currentUser;
      if (!realmUser && !userFromDb) {
        app.setCurrentUser({ realmUser: app.currentUser, dbUser: null });
      } else if (userFromDb && (!realmUser || !dbUser)) {
        app.setCurrentUser({ realmUser: app.currentUser, dbUser: userFromDb });
      }
    }
  });
  useEffect(() => callQuery({ id: app.currentUser.id }), [app.currentUser, callQuery]);

  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const handleToggle = () => setMenuInView(prevValue => !prevValue);
  const closeMenu = () => setMenuInView(false);

  return (
    <Router>
      <Navbar
        handleToggle={handleToggle}
        handleLogout={app.logOut}
        currentUser={app.currentUser}
      />
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
          component={MyAccount}
        />
        <Route path='/shop' component={Shop} />
        <Route path='/' component={Error404} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
