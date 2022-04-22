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
import {
  CartWrapper,
  TotalsWrapper,
  TotalsRows,
  TotalsLine,
  Spacer,
  ProductListWrapper
} from './StyledComponents.js';

// A view of all products that have been added to basket
const Cart = ({ activeOrder, updateActiveOrder }) => {
  useScrollToTop();
  const { currency } = useContext(CurrencyContext);

  const [subTotal, setSubTotal] = useState(0);

  const { isXs } = useBreakpoints();

  useEffect(() => {
    if (activeOrder && activeOrder.orderItems && activeOrder.orderItems.length) {
      setSubTotal(() => getCartSubTotal(activeOrder, currency));
    }
  }, [activeOrder, currency]);

  return (
    <CartWrapper>
      <ProductListWrapper>
        <Heading text='Cart' />
        <SectionSpacer />
        {
          activeOrder && activeOrder.orderItems && activeOrder.orderItems.length ? (
            <>
              {activeOrder.orderItems.map((item, index) => {
                return (
                  <CartProduct
                    key={index}
                    id={item._id}
                    order={activeOrder}
                    updateActiveOrder={updateActiveOrder}
                    orderItem={item}
                    currency={currency}
                  />
                );
              })}
              <TotalsWrapper>
                <Spacer />
                <TotalsRows>
                  <TotalsLine>
                    <h6>Subtotal</h6>
                    <Spacer />
                    <h6>{`${getCurrencySymbol(currency)}${subTotal}`}</h6>
                  </TotalsLine>
                  <TotalsLine>
                    <h6>Delivery</h6>
                    <Spacer />
                    <h6>-</h6>
                  </TotalsLine>
                  <TotalsLine>
                    <h6><strong>Total</strong></h6>
                    <Spacer />
                    <h6><strong>-</strong></h6>
                  </TotalsLine>
                </TotalsRows>
              </TotalsWrapper>
              <ActionButton
                text='Go to checkout'
                linkTo='/shop/checkout'
                fullWidth={isXs}
                customStyles={{ margin: !isXs && '1rem 0.25rem 0' }}
              />
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
  updateActiveOrder: PropTypes.func
};

export default Cart;
