// External imports
import React, { useState, useEffect, useContext } from 'react';

// Custom components
import { CurrentUserContext } from '../../../../context/currentUserContext.js';
import OrderById from '../../../../Components/Queries/OrderById.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import CartProductList from './CartProductList.js';

// Helpers
import { getActiveOrderFromUser } from '../../../../helpers/user.js';

const Cart = () => {
  const [currentUser] = useContext(CurrentUserContext);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.id && activeOrder === null) {
      setActiveOrder(getActiveOrderFromUser(currentUser));
    }
  }, [currentUser, activeOrder]);

  return (
    activeOrder
      ? <OrderById orderId={activeOrder.id} pollInterval={500}>
        {
          orderById =>
            <>
              <SectionSpacer dark spaceBelow />
              <CartProductList activeOrder={orderById} />
            </>
        }
        </OrderById>
      : null

  );
};

export default Cart;
