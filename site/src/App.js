import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import RealmApolloProvider from './realm/RealmApolloProvider';
import { RealmAppProvider } from './realm/RealmApp';

// Main views
import Home from './Views/Client/Home/Home.js';
import Shop from './Views/Client/Shop/Shop.js';
import Cart from './Views/Client/Shop/Cart/Cart.js';
import Checkout from './Views/Client/Shop/Checkout/Checkout.js';
import AboutUs from './Views/Client/AboutUs/AboutUs.js';
import ContactUs from './Views/Client/ContactUs/ContactUs.js';
import Error404 from './Views/Error/Error404.js';

// Global components
import Navbar from './Components/Navbar/Navbar';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import BackgroundShadow from './Components/BackgroundShadow/BackgroundShadow';
import Footer from './Components/Footer/Footer.js';

// Contexts
import { CurrentUserContextProvider } from './context/currentUserContext.js';

// // Apollo instance
// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql',
//   cache: new InMemoryCache()
// });
export const APP_ID = 'doves-and-dandys-fkaex';
// const RequireLoggedInUser = ({ children }) => {
//   // Only render children if there is a logged in user.
//   const app = useRealmApp();
//   return app.currentUser ? children : <LoginScreen />;
// };

// Stripe Instance
// const stripePromise = loadStripe('pk_test_51JssHLK4OzaV2zFUvwSBOreLFJyb8YuJT6rZheUc4MkBtGeMj9ZrqNd3mQebbi9nnLcGkLjqDaCMFwtT5KyjuBmN00M3I7Ekl1');

const App = () => {
  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const toggleHandler = () => setMenuInView(prevValue => !prevValue);
  const closeMenu = () => setMenuInView(false);

  // Stripe setup -->
  // const options = {
  //   clientSecret: 'sk_test_51JssHLK4OzaV2zFU3rKfTerqgOHjFTOf71gAedWEzLRTWg5ukgHA00xXyrH31uiiKPZ3EgZ2NiaxtsMRsgJkas1Z00yIQqdI20'
  // };

  return (
    <RealmAppProvider appId={APP_ID}>
      <RealmApolloProvider>
        {/* <Elements stripe={stripePromise} options={options}> */}
        <CurrentUserContextProvider>
          <Router>
            <Navbar handleToggleClick={toggleHandler} />
            {
              menuInView &&
                <>
                  <SideDrawer show={menuInView} handleDrawerLinkClick={closeMenu} />
                  <BackgroundShadow handleBackgroundClick={closeMenu} />
                </>
            }
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/shop/:category/:subCategory?/:productId?' component={Shop} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/checkout' component={Checkout} />
              <Route exact path='/about-us' component={AboutUs} />
              <Route exact path='/contact-us' component={ContactUs} />
              <Route path='/' component={Error404} />
            </Switch>
            <Footer />
          </Router>
        </CurrentUserContextProvider>
        {/* </Elements> */}
      </RealmApolloProvider>
    </RealmAppProvider>
  );
};

export default App;
