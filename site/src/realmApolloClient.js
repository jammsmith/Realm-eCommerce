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
    console.log('credentials', credentials);
    try {
      const user = await app.logIn(credentials);
      console.log('Successfully logged in!', user.id);
      setCurrentUser(app.currentUser);
    } catch (err) {
      console.error('Failed to log in', err.message);
    }
  };

  const logOut = async () => {
    if (app.currentUser) {
      await app.currentUser.logout();
    }
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    setCurrentUser(app.currentUser);
  };

  const wrapped = { ...realmApp, currentUser, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
