import { createContext, useContext, useState } from 'react';
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

// Setup graphql apollo client
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

// export const useRealmApp = () => {
//   const app = useContext(RealmAppContext);
//   console.log('app inside useRealmApp', app);
//   if (!app) {
//     throw new Error(
//       'You must call useRealmApp() inside of a <RealmAppProvider />'
//     );
//   }
//   return app;
// };
export const RealmAppContext = createContext();
export const RealmAppProvider = ({ children }) => {
  // Setup Realm App context

  const [realmApp] = useState(app);

  // Wrap the Realm.App object's user state with React state
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  async function logIn (credentials) {
    await app.logIn(credentials);
    // If successful, app.currentUser is the user that just logged in
    setCurrentUser(app.currentUser);
  }
  async function logOut () {
    // Log out the currently active user
    if (app.currentUser) {
      await app.currentUser.logout();
    }
    // If another user was logged in too, they're now the current user.
    // Otherwise, app.currentUser is null.
    setCurrentUser(app.currentUser);
  }

  const wrapped = { ...realmApp, currentUser, logIn, logOut };

  return (
    <RealmAppContext.Provider value={wrapped}>
      {children}
    </RealmAppContext.Provider>
  );
};
