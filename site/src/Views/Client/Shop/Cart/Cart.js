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

  // pollInterval={500} --- should be a prop for SingleOrderDetailed

  return (
    activeOrder
      ? <SingleOrderDetailed id={activeOrder._id}>
        {
          order =>
            (
              <>
                <SectionSpacer dark spaceBelow />
                <CartProductList activeOrder={order} />
                <SectionSpacer spaceBelow />
              </>
            )
        }
        </SingleOrderDetailed>
      : null

  );
};

export default Cart;
