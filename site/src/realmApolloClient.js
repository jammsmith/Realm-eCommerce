import { createContext, useState } from 'react';
import * as Realm from 'realm-web';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const appId = 'doves-and-dandys-fkaex';
const graphqlUri = `https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/${appId}/graphql`;
const app = new Realm.App(appId);

// Guarantee that there's a logged in user with a valid access token
const getValidAccessToken = async () => {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
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
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
      if (app.currentUser) {
        await app.currentUser.logOut();
      }
      const user = await app.logIn(credentials);
      setCurrentUser(app.currentUser);
      return user.id;
    } catch (err) {
      console.error('Failed to log in.', err.message);
    }
  };

  const logOut = async () => {
    try {
      if (app.currentUser) {
        await app.currentUser.logOut();

        if (app.currentUser) {
          // If another user was logged in too, they're now the current user.
          setCurrentUser(app.currentUser);
        } else {
          // Otherwise, create a new anonymous user and log them in.
          await app.logIn(Realm.Credentials.anonymous());
        }
      }
    } catch (err) {
      console.error('Failed to log user out.', err.message);
    }
  };

  const wrapped = { ...realmApp, currentUser, setCurrentUser, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
