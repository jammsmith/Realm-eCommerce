import React, { useEffect, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import CartProduct from '../Cart/CartProduct.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import Heading from '../../../../Components/Headings/Heading.js';
import LoadingView from '../../../../Components/LoadingView.js';
import useScrollToTop from '../../../../hooks/useScrollToTop.js';
import { getCurrencySymbol } from '../../../../helpers/price.js';
import { getFreeDeliveryConstraints } from '../../../../helpers/offers.js';
import { CurrencyContext } from '../../../../context/CurrencyContext.js';
import { OrderContext } from '../../../../context/OrderContext.js';

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
const CartSummary = ({ willCustomerPickUpInStore, deliveryFormComplete, successfulOrder }) => {
  useScrollToTop();

  const { currency } = useContext(CurrencyContext);
  const {
    activeOrder,
    subtotal,
    deliveryPrice
  } = useContext(OrderContext);

  const [completedOrderTotals, setCompletedOrderTotals] = useState({});

  const successfulPayment =
    successfulOrder &&
    successfulOrder.paymentStatus === 'successful' &&
    successfulOrder.orderItems;
  const failedPayment =
    activeOrder &&
    activeOrder.paymentStatus === 'failed';
  const orderInCheckout =
    activeOrder &&
    activeOrder.orderItems &&
    activeOrder.orderItems.length &&
    activeOrder.paymentStatus === 'notAttempted';

  let freeDelivery;
  if (orderInCheckout || failedPayment) {
    const freeDeliveryConstraints = getFreeDeliveryConstraints();
    freeDelivery = !!(subtotal >= freeDeliveryConstraints[currency] || willCustomerPickUpInStore.current);
  }

  // Get the actual paid totals if an order is completed and in final Summary stage
  const getCompletedOrderTotals = useCallback(() => {
    if (successfulPayment) {
      const { delivery } = successfulOrder;
      const amountPaid = successfulOrder.stripeAmountPaid / 100;

      setCompletedOrderTotals({
        completedTotal: amountPaid,
        completedSubtotal: amountPaid - delivery.price,
        completedDeliveryPrice: delivery.price
      });
    }
  }, [successfulOrder, successfulPayment]);

  useEffect(() => getCompletedOrderTotals(), [getCompletedOrderTotals]);

  //
  const { completedTotal, completedSubtotal, completedDeliveryPrice } = completedOrderTotals;

  // Get the delivery price to display
  const getDeliveryPriceToDisplay = () => {
    if ((deliveryFormComplete && orderInCheckout) || failedPayment) {
      if (!deliveryPrice) {
        return 'FREE';
      } else {
        return `${getCurrencySymbol(currency)}${deliveryPrice}`;
      }
    } else if (successfulPayment) {
      if (!completedDeliveryPrice) {
        return `${getCurrencySymbol(currency)}0`;
      } else {
        return `${getCurrencySymbol(currency)}${completedDeliveryPrice}`;
      }
    } else {
      return '-';
    }
  };

  const orderToDiplay = successfulOrder || activeOrder;

  return (
    <CartWrapper isMinimised>
      <ProductListWrapper>
        <Heading text='Order Summary' size='small' />
        <SectionSpacer />
        {
          orderToDiplay && orderToDiplay.orderItems ? (
            <>
              {orderToDiplay.orderItems.map((item, index) => (
                <CartProduct
                  key={index}
                  orderItem={item}
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
                    <h6>{`${getCurrencySymbol(currency)}${completedSubtotal || subtotal}`}</h6>
                  </TotalsLine>
                  <TotalsLine>
                    <h6>Delivery</h6>
                    <Spacer />
                    <DeliveryPrice showLineThrough={freeDelivery && deliveryPrice > 0}>
                      {getDeliveryPriceToDisplay()}
                    </DeliveryPrice>
                  </TotalsLine>
                  <TotalsLine>
                    <h6><strong>Total</strong></h6>
                    <Spacer />
                    <h6>
                      <strong>
                        {getCurrencySymbol(currency)}
                      </strong>
                      {
                        completedTotal
                          ? <strong>{completedTotal}</strong>
                          : freeDelivery
                            ? <strong>{subtotal}</strong>
                            : <strong>{subtotal + deliveryPrice}</strong>
                      }
                    </h6>
                  </TotalsLine>
                </TotalsRows>
              </TotalsWrapper>
            </>
          ) : <LoadingView />
        }
      </ProductListWrapper>
    </CartWrapper>
  );
};

CartSummary.propTypes = {
  willCustomerPickUpInStore: PropTypes.object,
  deliveryFormComplete: PropTypes.bool,
  successfulOrder: PropTypes.object
};

export default CartSummary;
