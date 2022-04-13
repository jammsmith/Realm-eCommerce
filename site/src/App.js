import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Main views
import Home from './Views/Client/Home/Home.js';
import Admin from './Views/Admin/Admin.js';
import Shop from './Views/Client/Shop/Shop.js';
import AboutUs from './Views/Client/AboutUs/AboutUs.js';
import ContactUs from './Views/Client/ContactUs/ContactUs.js';
import CustomerInfo from './Views/Client/CustomerInfo/CustomerInfo.js';
import Account from './Views/Client/Account/Account.js';
import Login from './Views/Client/Account/Login.js';
import Error404 from './Views/Error/Error404.js';

// Other
import ClientView from './Components/ClientView.js';
import PrivateClientRoute from './Components/PrivateRoutes/PrivateClientRoute.js';
import PrivateAdminRoute from './Components/PrivateRoutes/PrivateAdminRoute.js';
import { RealmAppContext } from './realmApolloClient.js';

const App = () => {
  const app = useContext(RealmAppContext);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (app && app.currentUser && app.currentUser.dbUser) {
      setAppReady(true);
    }
  }, [app]);

  return (
    appReady ? (
      <Router>
        <Switch>
          <PrivateAdminRoute
            exact
            path='/admin'
            component={Admin}
          />
          <Route
            exact
            path='/'
            render={() =>
              <ClientView>
                <Home />
              </ClientView>}
          />
          <Route
            exact
            path='/about-us'
            render={() =>
              <ClientView>
                <AboutUs />
              </ClientView>}
          />
          <Route
            exact
            path='/contact-us'
            render={() =>
              <ClientView>
                <ContactUs />
              </ClientView>}
          />
          <Route
            exact
            path='/customer-info'
            render={() =>
              <ClientView>
                <CustomerInfo />
              </ClientView>}
          />
          <Route
            exact
            path='/login'
            render={() =>
              <ClientView>
                <Login />
              </ClientView>}
          />
          <PrivateClientRoute
            exact
            path='/my-account'
            component={() =>
              <ClientView>
                <Account />
              </ClientView>}
          />
          <Route
            path='/shop'
            render={() =>
              <ClientView>
                <Shop />
              </ClientView>}
          />
          <Route
            path='/'
            render={() =>
              <ClientView>
                <Error404 />
              </ClientView>}
          />
        </Switch>
      </Router>
    ) : null
  );
};

export default App;
