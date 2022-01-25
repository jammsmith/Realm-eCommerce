import { useState, useEffect } from 'react';
import { getCartSubTotal } from '../helpers/cart.js';
import useCurrentUser from './useCurrentUser.js';

const useActiveOrder = () => {
  const [activeOrder, setActiveOrder] = useState();
  const [currentUser] = useCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.orders && currentUser.orders.length) {
      const order = currentUser.orders.find(order => order.orderStatus === 'pendingInCart');

      let subTotal;
      if (order && order.orderItems && order.orderItems.length) {
        subTotal = getCartSubTotal(order);
        setActiveOrder({ ...order, subTotal });
      } else if (order) {
        setActiveOrder(order);
      }
    }
  }, [currentUser]);

  return [activeOrder, setActiveOrder];
};

export default useActiveOrder;
