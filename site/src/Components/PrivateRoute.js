import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { RealmAppContext } from '../realmApolloClient.js';
import { isLoggedIn } from '../helpers/user.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const app = useContext(RealmAppContext);

  return (
  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
    <Route
      {...rest} render={props => {
        return (
          <>
            {isLoggedIn(app.currentUser) && <Component {...props} />}
            {isLoggedIn(app.currentUser) === false && <Redirect to='/login' />}
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
