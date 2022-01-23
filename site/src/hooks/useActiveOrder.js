import { useState, useEffect } from 'react';
import useCurrentUser from './useCurrentUser.js';

const useActiveOrder = () => {
  const [activeOrder, setActiveOrder] = useState();
  const [currentUser] = useCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.orders && currentUser.orders.length) {
      const order = currentUser.orders.find(order => order.orderStatus === 'pendingInCart');

      if (order && order.orderItems && order.orderItems.length) {
        const productTotals = order.orderItems.map(item => item.quantity * item.product.price);
        const reducer = (prevValue, currentValue) => prevValue + currentValue;
        if (productTotals) {
          const subTotal = productTotals.reduce(reducer);
          setActiveOrder({ ...order, subTotal });
        }
      } else if (order) {
        setActiveOrder(order);
      }
    }
  }, [currentUser]);

  return [activeOrder, setActiveOrder];
};

export default useActiveOrder;
