import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ProgressSpinner from '../../ProgressSpinner.js';
import { getDateFromUTCString } from '../../../helpers/global.js';
import { convertStripeAmountToPrice } from '../../../helpers/price.js';
import useBreakpoints from '../../../hooks/useBreakpoints.js';

import {
  OuterContainer,
  OrderItems,
  OrderItem,
  OrderStatus,
  ItemInfo,
  Info,
  CurrentStatus,
  CurrentStatusWrapper,
  Image,
  DataLoading
} from './styledComponents.js';

const OrderTile = ({ order }) => {
  const { isMd, isLg } = useBreakpoints();
  return (
    <OuterContainer>
      <OrderStatus>
        <div>
          <Info>Reference: <strong>{order.order_id}</strong></Info>
          <Info>Amount: <strong>£{convertStripeAmountToPrice(order.stripeAmountPaid)}</strong></Info>
          <Info>Paid: <strong>{getDateFromUTCString(order.datePaid)}</strong></Info>
          <Info>Order Accepted: <strong>{getDateFromUTCString(order.dateAccepted)}</strong></Info>
          <Info>Dispatched: <strong>{getDateFromUTCString(order.dateDispatched)}</strong></Info>
        </div>
        <CurrentStatusWrapper>
          {
            (isMd || isLg) && <Info>Current Status:</Info>
          }
          <CurrentStatus>{_.startCase(order.orderStatus)}</CurrentStatus>
        </CurrentStatusWrapper>
      </OrderStatus>
      <OrderItems>
        {
          order && order.orderItems ? (
            order.orderItems.map((item) => (
              <OrderItem key={item._id}>
                <Image src={item.product.images[0]} alt={item.product.name} />
                <ItemInfo>
                  <Info>{item.product.name}</Info>
                  <Info>Quantity: {item.quantity}</Info>
                </ItemInfo>
              </OrderItem>
            ))
          ) : (
            <DataLoading>
              <ProgressSpinner size='3rem' colour='blue' />
            </DataLoading>
          )
        }
      </OrderItems>
    </OuterContainer>
  );
};

OrderTile.propTypes = {
  order: PropTypes.object.isRequired
};

export default OrderTile;
