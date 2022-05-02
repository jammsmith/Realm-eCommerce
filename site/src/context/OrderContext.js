import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';

import { RealmAppContext } from '../realmApolloClient.js';
import { CurrencyContext } from './CurrencyContext.js';
import { getCartSubTotal } from '../helpers/cart.js';

export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const { currentUser } = useContext(RealmAppContext);
  const { currency } = useContext(CurrencyContext);

  const [activeOrder, setActiveOrder] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryCountry, setDeliveryCountry] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const deliveryZone = useRef();

  const getActiveOrder = useCallback(async () => {
    if (currentUser && currentUser.dbUser) {
      const user = currentUser.dbUser;

      if (user.orders && user.orders.length) {
        const order = user.orders.find(order => order.orderStatus === 'pendingInCart');

        if (order && order !== activeOrder) {
          setActiveOrder(order);
        }
      }
    }
  }, [currentUser, currency]);

  // Set the active order to the pending order if there is one
  useEffect(() => getActiveOrder(), [getActiveOrder, activeOrder]);

  // Set the subtotal whenever the order is updated
  useEffect(() => {
    if (activeOrder.orderItems && activeOrder.orderItems.length) {
      setSubtotal(getCartSubTotal(activeOrder, currency));
    } else {
      setSubtotal(0);
    }
  }, [activeOrder]);

  // If a delivery address is added to order, get the delivery price
  const getDeliveryPrice = useCallback(async () => {
    const response = await window.fetch('/PostalCountries/countries.json');
    const jsonResponse = await response.json();

    const requestedCountry = await jsonResponse.find(item => item.country === deliveryCountry);

    if (requestedCountry) {
      const price = await currentUser.functions.helper_getDeliveryPrice(
        activeOrder.orderItems,
        requestedCountry.deliveryZone,
        currency
      );
      setDeliveryPrice(price);
      deliveryZone.current = requestedCountry.deliveryZone;
    }
  }, [deliveryCountry, deliveryZone, activeOrder.orderItems, currentUser, currency]);

  useEffect(() => getDeliveryPrice(), [getDeliveryPrice, deliveryCountry]);

  return (
    <OrderContext.Provider
      value={{
        activeOrder,
        setActiveOrder,
        subtotal,
        deliveryCountry,
        setDeliveryCountry,
        deliveryPrice,
        deliveryZone
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
