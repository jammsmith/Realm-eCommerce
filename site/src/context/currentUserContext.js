import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import { SINGLE_USER } from '../graphql/queries.js';

export const CurrentUserContext = createContext([{}, () => {}]);

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [getUser, { error, data }] = useLazyQuery(SINGLE_USER);

  // Get full user for localStorage user if there is one or guest user if one is added during checkout
  useEffect(() => {
    const localStorageUser = JSON.parse(window.localStorage.getItem('currentUser'));

    if (localStorageUser && localStorageUser !== currentUser) {
      getUser({ variables: { id: localStorageUser.id } });
    }
    if (currentUser && currentUser.type === 'GUEST') {
      getUser({ variables: { id: currentUser.id } });
    }
    if (error) console.log('error', error);
    if (data) setCurrentUser(data.user);
  }, [currentUser, getUser, error, data]);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </CurrentUserContext.Provider>
  );
};

CurrentUserContextProvider.propTypes = {
  children: PropTypes.object.isRequired
};
