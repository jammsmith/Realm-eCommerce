import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Apollo / Realm
import { ApolloProvider } from '@apollo/client';
import client, { RealmAppProvider } from './realmApolloClient.js';

// Main views
import Home from './Views/Client/Home/Home.js';
import Shop from './Views/Client/Shop/Shop.js';
import AboutUs from './Views/Client/AboutUs/AboutUs.js';
import ContactUs from './Views/Client/ContactUs/ContactUs.js';
import AccountDialog from './Views/Account/AccountDialog.js';
import Error404 from './Views/Error/Error404.js';

// Global components
import Navbar from './Components/Navbar/Navbar';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import BackgroundShadow from './Components/BackgroundShadow/BackgroundShadow';
import Footer from './Components/Footer/Footer.js';

const App = () => {
  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const handleToggle = () => setMenuInView(prevValue => !prevValue);
  const closeMenu = () => setMenuInView(false);

  // Login / register dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenAccountDialog = () => setDialogOpen(true);
  const handleCloseAccountDialog = () => setDialogOpen(false);

  return (
    <RealmAppProvider>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </RealmAppProvider>
  );
};

export default App;
