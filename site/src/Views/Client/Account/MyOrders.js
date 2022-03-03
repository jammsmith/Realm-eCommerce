import React, { useState, useEffect } from 'react';

import DDTable from '../../../Components/Table/DDTable.js';

// Styled components
import { Wrapper } from './StyledComponents.js';

const MyOrders = ({ dbUser }) => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (dbUser.orders) {
      console.log('dbUser.orders', dbUser.orders);
      const successfulOrders = dbUser.orders.find(order => order.status === 'successful');
      if (successfulOrders) {
        setOrders(successfulOrders);
      }
    }
  }, [dbUser, setOrders]);

  const columns = [];
  if (orders) {
    for (const field in orders[0]) {
      columns.push(field);
    }
  }

  return (
    <Wrapper>
      {
        orders
          ? <DDTable
            rows={orders}
            columns={columns}
          />
          : 'no orders'
      }

    </Wrapper>
  );
};

export default MyOrders;
