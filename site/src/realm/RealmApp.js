import React, { useState, useEffect, useContext } from 'react';
import * as Realm from 'realm-web';

const RealmAppContext = React.createContext();

export const useRealmApp = () => {
  const app = useContext(RealmAppContext);
  if (!app) {
    throw new Error(
      'You must call useRealmApp() inside of a <RealmAppProvider />'
    );
  }
  return app;
};

export const RealmAppProvider = ({ appId, children }) => {
  const [app, setApp] = useState(new Realm.App(appId));
  console.log('app in RealmAppProvider', app);
  useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);

  // // Wrap the Realm.App object's user state with React state
  // const [currentUser, setCurrentUser] = useState(app.currentUser);
  // async function logIn (credentials) {
  //   console.log('credentials in logIn func', credentials);
  //   await app.logIn(credentials);
  //   // If successful, app.currentUser is the user that just logged in
  //   setCurrentUser(app.currentUser);
  // }
  // async function logOut () {
  //   // Log out the currently active user
  //   if (app.currentUser) {
  //     await app.currentUser.logout();
  //   }
  //   // If another user was logged in too, they're now the current user.
  //   // Otherwise, app.currentUser is null.
  //   setCurrentUser(app.currentUser);
  // }

  // const wrapped = { ...app, currentUser, logIn, logOut };

  return (
    <RealmAppContext.Provider value={app}>
      {children}
    </RealmAppContext.Provider>
  );
};
