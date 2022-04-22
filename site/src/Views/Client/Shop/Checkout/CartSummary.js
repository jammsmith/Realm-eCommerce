import React, { useEffect, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import CartProduct from '../Cart/CartProduct.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import Heading from '../../../../Components/Headings/Heading.js';
import useScrollToTop from '../../../../hooks/useScrollToTop.js';
import { getCartSubTotal } from '../../../../helpers/cart.js';
import { getCurrencySymbol } from '../../../../helpers/price.js';
import { CurrencyContext } from '../../../../context/CurrencyContext.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';

// Styled Components
import {
  CartWrapper,
  TotalsWrapper,
  TotalsRows,
  TotalsLine,
  Spacer,
  ProductListWrapper
} from '../Cart/StyledComponents.js';

// A view of all products that have been added to basket
const CartSummary = ({
  order,
  updateActiveOrder,
  deliveryCountry,
  isDeliveryFormComplete,
  deliveryZone
}) => {
  useScrollToTop();
  const app = useContext(RealmAppContext);
  const { currency } = useContext(CurrencyContext);

  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const getDeliveryZone = useCallback(async () => {
    const response = await window.fetch('/PostalCountries/countries.json');
    const jsonResponse = await response.json();

    const requestedCountry = await jsonResponse.find(item => item.country === deliveryCountry);
    return requestedCountry.deliveryZone;
  }, [deliveryCountry]);

  const getDeliveryPrice = useCallback(async () => {
    if (order && order.orderItems) {
      deliveryZone.current = await getDeliveryZone();
      const price = await app.currentUser.functions.helper_getDeliveryPrice(
        order.orderItems,
        deliveryZone.current,
        currency
      );
      setDeliveryPrice(price);
    }
  }, [order, deliveryZone, getDeliveryZone, currency, app.currentUser]);

  // If order has already completed (in Summary stage) then populate the order details, otherwise calculate details
  useEffect(() => {
    if (order && order.paymentStatus === 'successful') {
      const { delivery } = order;
      const amountPaid = order.stripeAmountPaid / 100;
      setSubTotal(delivery ? amountPaid - delivery.price : amountPaid);
      delivery && setDeliveryPrice(delivery.price);
    } else if (order && order.paymentStatus === 'failed') {
      setSubTotal(() => getCartSubTotal(order, currency));
      getDeliveryPrice();
    } else if (order && order.orderItems && order.orderItems.length) {
      setSubTotal(() => getCartSubTotal(order, currency));
      isDeliveryFormComplete && getDeliveryPrice();
    }
  }, [order, currency, deliveryCountry, getDeliveryPrice, isDeliveryFormComplete]);

  return (
    <CartWrapper isMinimised>
      <ProductListWrapper>
        <Heading text='Order Summary' size='small' />
        <SectionSpacer />
        <>
          {order.orderItems.map((item, index) => (
            <CartProduct
              key={index}
              id={item._id}
              order={order}
              updateActiveOrder={updateActiveOrder}
              orderItem={item}
              currency={currency}
              isMinimised
            />
          )
          )}
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
                <h6>{deliveryPrice === 0 ? '-' : `${getCurrencySymbol(currency)}${deliveryPrice}`}</h6>
              </TotalsLine>
              <TotalsLine>
                <h6><strong>Total</strong></h6>
                <Spacer />
                <h6><strong>{`${getCurrencySymbol(currency)}${subTotal + deliveryPrice}`}</strong></h6>
              </TotalsLine>
            </TotalsRows>
          </TotalsWrapper>
        </>
      </ProductListWrapper>
    </CartWrapper>
  );
};

CartSummary.propTypes = {
  order: PropTypes.object.isRequired,
  updateActiveOrder: PropTypes.func,
  deliveryCountry: PropTypes.string,
  isDeliveryFormComplete: PropTypes.bool,
  deliveryZone: PropTypes.string
};

export default CartSummary;
