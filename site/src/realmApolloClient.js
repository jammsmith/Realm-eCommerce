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
    let user;
    let error;
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      user = await app.logIn(credentials);
      const dbUser = await app.currentUser.functions.getDbUserData(user.id);
      setCurrentUser({ ...user, dbUser });
    } catch (err) {
      console.log('--- logIn -> error:', err);
      error = err;
    }
    return { user, error };
  };

  const logOut = async () => {
    try {
      if (app.currentUser) {
        await app.currentUser.logOut();

        if (app.currentUser) {
          // If another user was logged in too, they're now the current user.
          await app.currentUser.refreshCustomData();
          const dbUser = await app.currentUser.functions.getDbUserData(app.currentUser.id);
          setCurrentUser({ ...app.currentUser, dbUser });
        } else {
          // Otherwise, create a new anonymous user and log them in.
          const user = await app.logIn(Realm.Credentials.anonymous());
          setCurrentUser(user);
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
