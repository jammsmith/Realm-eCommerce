import React, { useState, useEffect } from 'react';

import DDTable from '../../../Components/Table/DDTable.js';

// Styled components
import { Wrapper } from './StyledComponents.js';

const MyOrders = ({ dbUser }) => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (dbUser.orders) {
      console.log('dbUser.orders', dbUser.orders);
      const successfulOrders = dbUser.orders.find(order => order.paymentStatus === 'successful');
      if (successfulOrders) {
        setOrders(successfulOrders);
      }
    }
  }, [dbUser]);

  const columns = ['Date', 'Order Id', 'Payment Status', 'Order Status', 'Amount'];

  const buildRows = (date, orderId, PaymentStatus, orderStatus, amount) => {
    return { date, orderId, PaymentStatus, orderStatus, amount };
  };

  let rows;
  if (orders && orders.length) {
    rows = orders.map(order => {
      buildRows('Frozen yoghurt', 159, 6.0, 24, 4.0);
    });
  } else if (orders) {
    rows = [buildRows('Frozen yoghurt', 159, 6.0, 24, 4.0)];
  }

  return (
    <Wrapper width='75%'>
      {
        orders
          ? <DDTable
            rows={rows}
            columns={columns}
          />
          : 'no orders'
      }
    </Wrapper>
  );
};

export default MyOrders;
