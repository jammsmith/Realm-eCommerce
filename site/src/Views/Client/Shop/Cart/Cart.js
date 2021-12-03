// External imports
import React from 'react';

// Custom components
import SingleOrderDetailed from '../../../../Components/Queries/SingleOrderDetailed.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import CartProductList from './CartProductList.js';

// Helpers/hooks
import useActiveOrder from '../../../../hooks/useActiveOrder.js';

const Cart = () => {
  const [activeOrder] = useActiveOrder();

  return (
    activeOrder
      ? <SingleOrderDetailed id={activeOrder._id} pollInterval={500}>
        {
          order =>
            <>
              <SectionSpacer dark />
              <CartProductList activeOrder={order} />
            </>
        }
        </SingleOrderDetailed>
      : null

  );
};

export default Cart;
