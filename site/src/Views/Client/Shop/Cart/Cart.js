// External imports
import React, { useState, useEffect, useContext } from 'react';

// Custom components
import { CurrentUserContext } from '../../../../context/currentUserContext.js';
import SingleOrderDetailed from '../../../../Components/Queries/SingleOrderDetailed.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import CartProductList from './CartProductList.js';

// Helpers
// import { getActiveOrderFromUser } from '../../../../helpers/user.js';

const Cart = () => {
  const [currentUser] = useContext(CurrentUserContext);
  const [activeOrder, setActiveOrder] = useState(null);

  // useEffect(() => {
  //   if (currentUser && currentUser.id && activeOrder === null) {
  //     setActiveOrder(getActiveOrderFromUser(currentUser));
  //   }
  // }, [currentUser, activeOrder]);

  return (
    activeOrder
      ? <SingleOrderDetailed id={activeOrder.id} pollInterval={500}>
        {
          orderById =>
            <>
              <SectionSpacer dark spaceBelow />
              <CartProductList activeOrder={orderById} />
            </>
        }
        </SingleOrderDetailed>
      : null

  );
};

export default Cart;
