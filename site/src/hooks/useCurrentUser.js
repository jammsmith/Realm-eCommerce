import { useContext, useState, useEffect } from 'react';
import { RealmAppContext } from '../realmApolloClient.js';
import { useLazyQuery } from '@apollo/client';
import { USER_DETAILED } from '../graphql/queries.js';

const useCurrentUser = () => {
  const app = useContext(RealmAppContext);
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  const [getUser, { error, data }] = useLazyQuery(USER_DETAILED, {
    variables: { id: app.currentUser.id }
  });

  useEffect(() => {
    getUser();
    if (error) throw new Error(`Failed to get current user from DB. Error ${error}`);
    if (data && data.user && data.user !== currentUser) {
      setCurrentUser(data.user);
    }
  }, [currentUser, getUser, error, data]);

  return [currentUser, setCurrentUser];
};

export default useCurrentUser;
