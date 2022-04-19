import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import App from './App.js';
import { ApolloProvider } from '@apollo/client';
import client, { RealmAppProvider } from './realmApolloClient.js';
import { CurrencyContextProvider } from './context/CurrencyContext.js';

ReactDOM.render(
  <React.StrictMode>
    <RealmAppProvider>
      <ApolloProvider client={client}>
        <CurrencyContextProvider>
          <App />
        </CurrencyContextProvider>
      </ApolloProvider>
    </RealmAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
