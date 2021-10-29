import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { userById } from '../graphql/queries.js';

export const CurrentUserContext = createContext([{}, () => {}]);

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const localStorageUser = JSON.parse(window.localStorage.getItem('currentUser'));
  let variables;
  if (localStorageUser) {
    variables = { id: localStorageUser.id };
  } else {
    variables = { id: '' };
  }

  // Set user context to localStorage user if there is one
  const { data, error } = useQuery(userById, { variables });
  useEffect(() => {
    if (error) console.log(error);
    if (data) {
      const user = data.userById;
      setCurrentUser(user);
    }
  }, [data, error]);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </CurrentUserContext.Provider>
  );
};

CurrentUserContextProvider.propTypes = {
  children: PropTypes.object.isRequired
};
