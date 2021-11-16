import * as Realm from 'realm-web';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const APP_ID = 'doves-and-dandys-fkaex';
const graphqlUri = 'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/doves-and-dandys-fkaex/graphql';
const app = new Realm.App(APP_ID);

const getValidAccessToken = async () => {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
};

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
