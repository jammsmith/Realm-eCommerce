import { useState, useEffect } from 'react';
import useCurrentUser from './useCurrentUser.js';

const useActiveOrder = () => {
  const [activeOrder, setActiveOrder] = useState();
  const [currentUser] = useCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.orders && currentUser.orders.length) {
      const response = currentUser.orders.find(order => order.orderStatus === 'pendingInCart');
      if (response) {
        setActiveOrder(response);
      }
    }
  }, [currentUser]);

  return [activeOrder, setActiveOrder];
};

export default useActiveOrder;
