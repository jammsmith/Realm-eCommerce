import { useState, useEffect } from 'react';
import useCurrentUser from './useCurrentUser.js';

const useActiveOrder = () => {
  const [activeOrder, setActiveOrder] = useState();
  const [currentUser] = useCurrentUser();

  useEffect(() => {
    if (currentUser && currentUser.orders && currentUser.orders.length) {
      const response = currentUser.orders.find(order => order.isPendingInCheckout === true);
      if (!response) return;
      setActiveOrder(response);
    }
  }, [currentUser]);

  return [activeOrder, setActiveOrder];
};

export default useActiveOrder;
