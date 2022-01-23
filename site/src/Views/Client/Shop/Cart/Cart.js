// External imports
import React from 'react';
import PropTypes from 'prop-types';

// Components
import CartProduct from './CartProduct.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import ActionButton from '../../../../Components/ActionButton.js';

// Hook / helpers
import useActiveOrder from '../../../../hooks/useActiveOrder.js';

// Styled Components
import { CartWrapper, TotalsLine, ProductListWrapper } from './StyledComponents.js';

// A view of all products that have been added to basket
const Cart = ({ isMinimised }) => {
  const [activeOrder] = useActiveOrder();

  return (
    activeOrder
      ? <CartWrapper isMinimised={isMinimised}>
        {!isMinimised && <SectionSpacer dark spaceBelow />}
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
                    isMinimised={isMinimised}
                  />
                );
              })}
              <TotalsLine>
                <h6>Subtotal</h6>
                <h6>£{activeOrder.subTotal}</h6>
              </TotalsLine>
              {
                !isMinimised &&
                  <ActionButton
                    text='Go to checkout'
                    linkTo='/checkout'
                  />
              }
              </ProductListWrapper>
            : <>
              <SectionSpacer />
              <h6>Your cart is empty!</h6>
              <SectionSpacer />
              </>
        }
        <SectionSpacer spaceBelow />
        </CartWrapper>
      : null
  );
};

Cart.propTypes = {
  isMinimised: PropTypes.bool
};

export default Cart;
