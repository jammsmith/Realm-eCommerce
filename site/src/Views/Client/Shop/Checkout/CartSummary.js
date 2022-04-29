import React, { useEffect, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import CartProduct from '../Cart/CartProduct.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import Heading from '../../../../Components/Headings/Heading.js';
import useScrollToTop from '../../../../hooks/useScrollToTop.js';
import { getCartSubTotal } from '../../../../helpers/cart.js';
import { getCurrencySymbol } from '../../../../helpers/price.js';
import { getFreeDeliveryConstraints } from '../../../../helpers/offers.js';
import { CurrencyContext } from '../../../../context/CurrencyContext.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';

// Styled Components
import {
  CartWrapper,
  TotalsWrapper,
  TotalsRows,
  TotalsLine,
  Spacer,
  ProductListWrapper,
  DeliveryPrice
} from '../Cart/StyledComponents.js';

// A view of all products that have been added to basket
const CartSummary = ({
  order,
  updateActiveOrder,
  deliveryCountry,
  isDeliveryFormComplete,
  deliveryZone,
  willCustomerPickUpInStore
}) => {
  useScrollToTop();
  const app = useContext(RealmAppContext);
  const { currency } = useContext(CurrencyContext);

  const successfulPayment = order && order.paymentStatus === 'successful';
  const failedPayment = order && order.paymentStatus === 'failed';
  const orderInCheckout = order && order.orderItems && order.orderItems.length && order.paymentStatus === 'notAttempted';

  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  let freeDelivery;
  if (orderInCheckout || failedPayment) {
    const freeDeliveryConstraints = getFreeDeliveryConstraints();
    freeDelivery = !!(subTotal >= freeDeliveryConstraints[currency] || willCustomerPickUpInStore.current);
  }

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
    if (successfulPayment) {
      // populate summary details from successful order
      const { delivery } = order;
      const amountPaid = order.stripeAmountPaid / 100;
      setSubTotal(delivery ? amountPaid - delivery.price : amountPaid);
      delivery && setDeliveryPrice(delivery.price || 0);
      //
    } else if (failedPayment) {
      // populate summary details from failed order + re-calculate delivery amount
      setSubTotal(() => getCartSubTotal(order, currency));
      getDeliveryPrice();
      //
    } else if (orderInCheckout) {
      // calculate summary details and populate form. Check whether or not customer will pay delivery
      const cartSubTotal = getCartSubTotal(order, currency);
      setSubTotal(cartSubTotal);

      if (isDeliveryFormComplete && deliveryCountry) {
        getDeliveryPrice();
      }
    }
  }, [
    order,
    currency,
    deliveryCountry,
    getDeliveryPrice,
    isDeliveryFormComplete,
    successfulPayment,
    failedPayment,
    orderInCheckout
  ]);

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
                <DeliveryPrice isDeliveryFree={freeDelivery}>
                  {!deliveryPrice ? '' : `${getCurrencySymbol(currency)}${deliveryPrice}`}
                </DeliveryPrice>
                {freeDelivery && <h6>FREE</h6>}
              </TotalsLine>
              <TotalsLine>
                <h6><strong>Total</strong></h6>
                <Spacer />
                <h6>
                  <strong>
                    {`${getCurrencySymbol(currency)}
                      ${freeDelivery
                          ? subTotal
                          : subTotal + deliveryPrice}`}
                  </strong>
                </h6>
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
  deliveryZone: PropTypes.object
};

export default CartSummary;
