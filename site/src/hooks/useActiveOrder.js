import { useState, useEffect } from 'react';
import { getCartSubTotal } from '../helpers/cart.js';

const useActiveOrder = (user) => {
  const [activeOrder, setActiveOrder] = useState();

  useEffect(() => {
    if (user && user.orders && user.orders.length) {
      const order = user.orders.find(order => order.orderStatus === 'pendingInCart');

      let subTotal;
      if (order && order.orderItems && order.orderItems.length) {
        subTotal = getCartSubTotal(order);
        setActiveOrder({ ...order, subTotal });
      } else if (order) {
        setActiveOrder(order);
      }
    }
  }, [user]);

  return [activeOrder, setActiveOrder];
};

export default useActiveOrder;
