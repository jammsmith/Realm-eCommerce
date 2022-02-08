import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { RealmAppContext } from '../realmApolloClient.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const app = useContext(RealmAppContext);
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  useEffect(() => {
    if (
      app.currentUser?.providerType === 'local-userpass' ||
      app.currentUser?.realmUser?.providerType === 'local-userpass'
    ) {
      setIsLoggedIn(true);
    } else if (
      app.currentUser?.providerType === 'anon-user' ||
      app.currentUser?.realmUser?.providerType === 'anon-user'
    ) {
      setIsLoggedIn(false);
    }
  }, [app.currentUser]);

  return (
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
    <Route
      {...rest} render={props => {
        return (
          <>
            {isLoggedIn && <Component {...props} />}
            {isLoggedIn === false && <Redirect to='/login' />}
          </>
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
