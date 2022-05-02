import React, { useContext } from 'react';

import CartProduct from './CartProduct.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import ActionButton from '../../../../Components/ActionButton.js';
import Heading from '../../../../Components/Headings/Heading.js';
import useBreakpoints from '../../../../hooks/useBreakpoints.js';
import useScrollToTop from '../../../../hooks/useScrollToTop.js';
import { getCurrencySymbol } from '../../../../helpers/price.js';
import { CurrencyContext } from '../../../../context/CurrencyContext.js';
import { OrderContext } from '../../../../context/OrderContext.js';

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
const Cart = () => {
  useScrollToTop();

  const { currency } = useContext(CurrencyContext);
  const { activeOrder, subtotal } = useContext(OrderContext);

  const { isXs } = useBreakpoints();

  return (
    <CartWrapper>
      <ProductListWrapper>
        <Heading text='Cart' />
        <SectionSpacer />
        {
          activeOrder && activeOrder.orderItems && activeOrder.orderItems.length ? (
            <>
              {activeOrder.orderItems.map((item, index) => (
                <CartProduct
                  key={index}
                  orderItem={item}
                />
              )
              )}
              <TotalsWrapper>
                <Spacer />
                <TotalsRows>
                  <TotalsLine>
                    <h6>Subtotal</h6>
                    <Spacer />
                    <h6>{`${getCurrencySymbol(currency)}${subtotal}`}</h6>
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

export default Cart;
