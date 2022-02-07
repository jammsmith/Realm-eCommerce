import React, { useState, useEffect, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

// Main views
import Home from './Views/Client/Home/Home.js';
import Shop from './Views/Client/Shop/Shop.js';
import AboutUs from './Views/Client/AboutUs/AboutUs.js';
import ContactUs from './Views/Client/ContactUs/ContactUs.js';
import AccountDialog from './Views/Account/AccountDialog.js';
import Error404 from './Views/Error/Error404.js';

// Other
import Navbar from './Components/Navbar/Navbar';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import BackgroundShadow from './Components/BackgroundShadow/BackgroundShadow';
import Footer from './Components/Footer/Footer.js';
import { RealmAppContext } from './realmApolloClient.js';
import { USER_DETAILED } from './graphql/queries.js';

const App = () => {
  // Make sure app.currentUser is an object that contains both realmAppUser & dbUser
  const app = useContext(RealmAppContext);
  const [getDbUser, { loading, error, data }] = useLazyQuery(USER_DETAILED, {
    variables: { id: app.currentUser.id }
  });

  const getUser = useCallback(() => {
    if (!loading && !error && !data) getDbUser();
    if (error) throw new Error('Failed to get user from database');
    if (data && data.user) {
      return data.user;
    }
  }, [loading, error, data, getDbUser]);

  useEffect(() => {
    const { realmUser, dbUser } = app.currentUser;
    if (!realmUser || !dbUser) {
      const user = {};
      if (!realmUser) user.realmUser = app.currentUser;
      if (!dbUser) user.dbUser = getUser();
      if (user.realmUser && user.dbUser && user !== app.currentUser) {
        app.setCurrentUser(user);
      }
    }
  }, [app, getUser, loading, error, data]);

  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const handleToggle = () => setMenuInView(prevValue => !prevValue);
  const closeMenu = () => setMenuInView(false);

  // Login / register dialog -->
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenAccountDialog = () => setDialogOpen(true);
  const handleCloseAccountDialog = () => setDialogOpen(false);

  return (
    <Router>
      <Navbar
        handleToggle={handleToggle}
        handleOpenAccountDialog={handleOpenAccountDialog}
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
      {
        dialogOpen &&
          <AccountDialog
            open={dialogOpen}
            handleClose={handleCloseAccountDialog}
          />
      }
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about-us' component={AboutUs} />
        <Route exact path='/contact-us' component={ContactUs} />
        <Route path='/shop' component={Shop} />
        <Route path='/' component={Error404} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
