// External imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import CartProduct from './CartProduct.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import ActionButton from '../../../../Components/ActionButton.js';

// Hook / helpers
import useActiveOrder from '../../../../hooks/useActiveOrder.js';
import useBreakpoints from '../../../../hooks/useBreakpoints.js';
import { getCartSubTotal } from '../../../../helpers/cart.js';

// Styled Components
import { CartWrapper, TotalsLine, ProductListWrapper } from './StyledComponents.js';
import { CheckoutHeading } from '../Checkout/StyledComponents.js';

// A view of all products that have been added to basket
const Cart = ({ order, isMinimised }) => {
  const [activeOrder, setActiveOrder] = useActiveOrder();
  const [subTotal, setSubTotal] = useState();
  const { isXs } = useBreakpoints();

  useEffect(() => {
    // Alternative order can be passed in to show the cart component with an order of choice
    if (order && order !== activeOrder) {
      setActiveOrder(order);
    }

    // Add subtotal to order object if there isnt one already
    if (activeOrder && activeOrder.subTotal) {
      setSubTotal(activeOrder.subTotal);
    } else if (activeOrder && activeOrder.orderItems && activeOrder.orderItems.length) {
      setSubTotal(() => getCartSubTotal(activeOrder));
    } else {
      setSubTotal(0);
    }
  }, [activeOrder, setActiveOrder, order]);

  return (
    activeOrder
      ? <CartWrapper isMinimised={isMinimised}>
        <ProductListWrapper>
          <CheckoutHeading>Cart</CheckoutHeading>
          <SectionSpacer />
          {
            activeOrder && activeOrder.orderItems && activeOrder.orderItems.length
              ? <>
                {activeOrder.orderItems.map((item, index) => {
                  return (
                    <CartProduct
                      key={index}
                      id={item._id}
                      activeOrderState={[activeOrder, setActiveOrder]}
                      orderItem={item}
                      isMinimised={isMinimised}
                    />
                  );
                })}
                <TotalsLine>
                  <h6>Subtotal</h6>
                  <h6>£{subTotal}</h6>
                </TotalsLine>
                {
                  !isMinimised &&
                    <ActionButton
                      text='Go to checkout'
                      linkTo='/shop/checkout'
                      fullWidth={isXs}
                      customStyles={{ margin: !isXs && '1rem 0.25rem 0' }}
                    />
                }
                </>
              : <>
                <SectionSpacer />
                <h6>Your cart is empty!</h6>
                <SectionSpacer />
              </>
          }
        </ProductListWrapper>
        <SectionSpacer spaceBelow />
        </CartWrapper>
      : null
  );
};

Cart.propTypes = {
  order: PropTypes.object,
  isMinimised: PropTypes.bool
};

export default Cart;
