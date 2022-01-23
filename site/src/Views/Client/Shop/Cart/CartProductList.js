// External imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import CartProduct from './CartProduct.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import ActionButton from '../../../../Components/ActionButton.js';

// Styled Components
import { TotalsLine, ProductListWrapper } from './StyledComponents.js';

// A view of all products that have been added to basket
const CartProductList = ({ activeOrder, handleGoToCheckout }) => {
  const [cartSubTotal, setCartSubTotal] = useState(0);

  useEffect(() => {
    if (activeOrder && activeOrder.orderItems && activeOrder.orderItems.length) {
      const productTotals = activeOrder.orderItems.map(item => item.quantity * item.product.price);
      const reducer = (prevValue, currentValue) => prevValue + currentValue;
      if (productTotals) {
        setCartSubTotal(productTotals.reduce(reducer));
      }
    }
  }, [activeOrder]);

  return (
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
          <h6>£{cartSubTotal}</h6>
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
  );
};

CartProductList.propTypes = {
  activeOrder: PropTypes.object
};

export default CartProductList;
