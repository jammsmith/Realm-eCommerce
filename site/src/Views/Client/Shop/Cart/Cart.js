// External imports
import React from 'react';

// Components
import CartProduct from './CartProduct.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import ActionButton from '../../../../Components/ActionButton.js';

// Hook / helpers
import useActiveOrder from '../../../../hooks/useActiveOrder.js';

// Styled Components
import { TotalsLine, ProductListWrapper } from './StyledComponents.js';

// A view of all products that have been added to basket
const Cart = () => {
  const [activeOrder] = useActiveOrder();

  return (
    activeOrder
      ? <>
        <SectionSpacer dark spaceBelow />
        {
          activeOrder.orderItems && activeOrder.orderItems.length
            ? <ProductListWrapper>
              {activeOrder.orderItems.map((item, index) => {
                return (
                  <CartProduct
                    key={index}
                    id={item._id}
                    order={activeOrder}
                    orderItem={item}
                  />
                );
              })}
              <TotalsLine>
                <h6>Subtotal</h6>
                <h6>£{activeOrder.subTotal}</h6>
              </TotalsLine>
              <ActionButton
                text='Go to checkout'
                linkTo='/checkout'
              />
              </ProductListWrapper>
            : <>
              <SectionSpacer />
              <h6>Your cart is empty!</h6>
              <SectionSpacer />
              </>
        }
        <SectionSpacer spaceBelow />
        </>
      : null
  );
};

export default Cart;
