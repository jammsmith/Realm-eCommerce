import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import CartProduct from './CartProduct.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import ActionButton from '../../../../Components/ActionButton.js';
import Heading from '../../../../Components/Headings/Heading.js';
import useBreakpoints from '../../../../hooks/useBreakpoints.js';
import useScrollToTop from '../../../../hooks/useScrollToTop.js';
import { getCartSubTotal } from '../../../../helpers/cart.js';
import { getCurrencySymbol } from '../../../../helpers/price.js';
import { CurrencyContext } from '../../../../context/CurrencyContext.js';

// Styled Components
import { CartWrapper, TotalsLine, ProductListWrapper } from './StyledComponents.js';

// A view of all products that have been added to basket
const Cart = ({ activeOrder, updateActiveOrder, altOrder, isMinimised }) => {
  useScrollToTop();

  const { currency } = useContext(CurrencyContext);

  const [subTotal, setSubTotal] = useState(0);
  const { isXs } = useBreakpoints();

  // Alternative order can be passed in to show the cart component with an order of choice
  const order = altOrder || activeOrder;

  useEffect(() => {
    // Add subtotal to order object if there isnt one already
    if (order && order.subTotal) {
      setSubTotal(order.subTotal);
    } else if (order && order.orderItems && order.orderItems.length) {
      setSubTotal(() => getCartSubTotal(order, currency));
    }
  }, [order, currency]);

  return (
    <CartWrapper isMinimised={isMinimised}>
      <ProductListWrapper>
        <Heading text='Cart' size={isMinimised && 'small'} />
        <SectionSpacer />
        {
          order && order.orderItems && order.orderItems.length ? (
            <>
              {order.orderItems.map((item, index) => {
                return (
                  <CartProduct
                    key={index}
                    id={item._id}
                    order={order}
                    updateActiveOrder={updateActiveOrder}
                    orderItem={item}
                    isMinimised={isMinimised}
                    currency={currency}
                  />
                );
              })}
              <TotalsLine>
                <h6>Subtotal</h6>
                <h6>{`${getCurrencySymbol(currency)}${subTotal}`}</h6>
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
          ) : (
            <>
              <SectionSpacer />
              <h6>Your cart is empty!</h6>
              <SectionSpacer />
            </>
          )
        }
      </ProductListWrapper>
      <SectionSpacer spaceBelow />
    </CartWrapper>
  );
};

Cart.propTypes = {
  activeOrder: PropTypes.object,
  updateActiveOrder: PropTypes.func,
  altOrder: PropTypes.object,
  isMinimised: PropTypes.bool
};

export default Cart;
