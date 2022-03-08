import React from 'react';
import _ from 'lodash';

import DDTable from '../../../Components/Table/DDTable.js';

// Styled components
import { Wrapper } from './StyledComponents.js';

const MyOrders = ({ dbUser }) => {
  const columns = ['Date', 'Order Id', 'Payment Status', 'Order Status', 'Amount'];

  const buildRows = (date, orderId, paymentStatus, orderStatus, amount) => {
    const formattedDate = date.split('T')[0];
    return {
      date: formattedDate,
      orderId,
      paymentStatus: _.startCase(paymentStatus),
      orderStatus: _.startCase(orderStatus),
      amount
    };
  };
  const orders = dbUser.orders.filter(order => order.paymentStatus === 'successful');

  const rows = orders && orders.length &&
    orders.map(order =>
      buildRows(order.datePaid, order._id, order.paymentStatus, order.orderStatus, 4.0)
    );

  return (
    <Wrapper width='75%'>
      {
        orders
          ? <DDTable
            rows={rows || []}
            columns={columns}
          />
          : 'no orders'
      }
    </Wrapper>
  );
};

export default MyOrders;
