import { createContext, useState, useEffect, useCallback } from 'react';
import * as Realm from 'realm-web';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const appId = 'doves-and-dandys-fkaex';
const graphqlUri = `https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/${appId}/graphql`;
const app = new Realm.App(appId);

// Guarantee that there's a logged in user with a valid access token
const getValidAccessToken = async () => {
  try {
    if (!app.currentUser) {
      await app.logIn(Realm.Credentials.anonymous());
    } else {
      await app.currentUser.refreshCustomData();
    }
    return app.currentUser.accessToken;
  } catch (err) {
    throw new Error('Failed to get valid access token. Error:', err);
  }
};

// Setup Graphql Apollo client
export default new ApolloClient({
  link: new HttpLink({
    uri: graphqlUri,
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    }
  }),
  cache: new InMemoryCache()
});

// Setup Realm App context
export const RealmAppContext = createContext();

export const RealmAppProvider = ({ children }) => {
  const [realmApp] = useState(app);
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  const logIn = async (email, password) => {
    let error;
    let user;
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      user = await app.logIn(credentials);
      setCurrentUser(user);
    } catch (err) {
      error = err;
    }
    return { user, error };
  };

  const logOut = async () => {
    let error;
    try {
      if (app.currentUser) {
        await app.currentUser.logOut();

        if (app.currentUser) {
          // If another user was logged in too, they're now the current user.
          await app.currentUser.refreshCustomData();
          setCurrentUser(app.currentUser);
        } else {
          // Otherwise, create a new anonymous user and log them in.
          const credentials = Realm.Credentials.anonymous();
          const user = await app.logIn(credentials);
          setCurrentUser(user);
        }
      }
    } catch (err) {
      error = err;
    }
    return { error };
  };

  useEffect(() => {
    const attachDbUser = async () => {
      try {
        const dbUser = await app.currentUser.functions.getDbUserData(app.currentUser.id);
        if (dbUser) {
          if (currentUser.dbUser !== dbUser) {
            setCurrentUser(prev => ({ ...prev, dbUser: dbUser }));
          }
        } else if (!currentUser.dbUser || Object.keys(currentUser.dbUser).length) {
          setCurrentUser(prev => ({ ...prev, dbUser: {} }));
        }
      } catch (err) {
        console.error('Failed to retrieve user details from db. Error:', err);
      }
    };
    if (currentUser && (!currentUser.dbUser || !currentUser.dbUser._id)) {
      attachDbUser();
    }
  }, [currentUser]);

  const wrapped = {
    ...realmApp,
    currentUser,
    setCurrentUser,
    logIn,
    logOut
  };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
