// External imports
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import CartProduct, { CartLine } from './CartProduct.js';

// Styled components
const TotalsLine = styled(CartLine)`
  flex-direction: row;
  border-bottom: none;
  justify-content: space-between;
`;

const ProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// A view of all products that have been added to basket
const CartProductList = ({ activeOrder }) => {
  const [cartSubTotal, setCartSubTotal] = useState(0);

  useEffect(() => {
    if (activeOrder && activeOrder.orderItems && activeOrder.orderItems.length > 0) {
      const productTotals = activeOrder.orderItems.map(item => item.quantity * item.product.price);
      const reducer = (prevValue, currentValue) => prevValue + currentValue;
      if (productTotals) {
        setCartSubTotal(productTotals.reduce(reducer));
      }
    }
  }, [activeOrder]);

  if (!activeOrder.orderItems) return 'No current order';

  return (
    <ProductListWrapper>
      {activeOrder.orderItems.map((item, index) => {
        return <CartProduct key={index} id={item.id} orderItem={item} />;
      })}
      <TotalsLine>
        <h6>Subtotal</h6>
        <h6>£{cartSubTotal}</h6>
      </TotalsLine>
    </ProductListWrapper>
  );
};

CartProductList.propTypes = {
  activeOrder: PropTypes.object
};

export default CartProductList;
