import React from 'react';

import OrderTile from '../../../Components/Tiles/OrderTile/OrderTile.js';

import { Wrapper } from './StyledComponents.js';

const MyOrders = ({ dbUser }) => {
  const orders = dbUser.orders && dbUser.orders
    .filter(order => (
      order.paymentStatus === 'successful' || order.paymentStatus === 'refunded')
    ).sort((a, b) => (
      b.datePaid - a.datePaid)
    );

  return (
    <Wrapper width='100%'>
      {
        orders
          ? orders.map(order => <OrderTile key={order._id} order={order} />)
          : 'no orders'
      }
    </Wrapper>
  );
};

export default MyOrders;
