import { useState, useEffect } from 'react';
import useCurrentUser from './useCurrentUser.js';

const useActiveOrder = () => {
  const [activeOrder, setActiveOrder] = useState();
  const [currentUser] = useCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.orders && currentUser.orders.length) {
      const response = currentUser.orders.find(order => order.status === 'pendingInCart');
      if (response) {
        setActiveOrder(response);
      } else {
        throw new Error(`User ID "${currentUser._id}" has no active orders`);
      }
    }
  }, [currentUser]);

  return [activeOrder, setActiveOrder];
};

export default useActiveOrder;
