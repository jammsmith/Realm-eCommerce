import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { RealmAppContext } from '../realmApolloClient.js';
import { isAuthenticated, isAdmin } from '../helpers/auth.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const app = useContext(RealmAppContext);

  return (
    app.currentUser && app.currentUser.dbUser
      ? <Route
        {...rest} render={props => {
          return (
            <>
              {isAuthenticated(app.currentUser) && <Component {...props} />}
              {isAuthenticated(app.currentUser) === false && <Redirect to='/login' />}
            </>
          );
        }}
        />
      : null
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
