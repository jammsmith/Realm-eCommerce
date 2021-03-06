import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext
} from 'react';

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
    if (!activeOrder || !Object.keys(activeOrder).length) {
      if (currentUser && currentUser.dbUser) {
        const userActiveOrder = await currentUser.functions.db_getActiveOrder(currentUser.dbUser.user_id);
        if (userActiveOrder !== activeOrder) {
          setActiveOrder(userActiveOrder);
        }
      }
    }
  }, [currentUser, activeOrder]);

  // Set the active order to the pending order if there is one or just refetch the db user
  // to make sure it stays consistent with active order changes
  useEffect(() => getActiveOrder(), [getActiveOrder]);

  // Set the subtotal whenever the order is updated
  useEffect(() => {
    if (activeOrder && activeOrder.orderItems && activeOrder.orderItems.length) {
      setSubtotal(getCartSubTotal(activeOrder, currency));
    } else {
      setSubtotal(0);
    }
  }, [activeOrder, currency]);

  // If a delivery address is added to order, get the delivery price
  const getDeliveryPrice = useCallback(async () => {
    const response = await window.fetch('/PostalCountries/countries.json');
    const countries = await response.json();

    const requestedCountry = await countries.find(item => item.country === deliveryCountry);

    if (requestedCountry) {
      const price = await currentUser.functions.helper_getDeliveryPrice(
        activeOrder.orderItems,
        requestedCountry.deliveryZone,
        currency
      );
      setDeliveryPrice(price);
      deliveryZone.current = requestedCountry.deliveryZone;
    }
  }, [deliveryCountry, deliveryZone, activeOrder, currentUser, currency]);

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
