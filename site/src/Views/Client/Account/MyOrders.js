import React, { useState, useEffect } from 'react';

// Styled components
import { Wrapper } from './StyledComponents.js';

const MyOrders = ({ dbUser }) => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (dbUser.orders) {
      const successfulOrders = dbUser.orders.find(order => order.status === 'successful');
      if (successfulOrders) {
        setOrders(successfulOrders);
      }
    }
  }, [dbUser, setOrders]);

  return (
    <Wrapper>
      some content
    </Wrapper>
  );
};

export default MyOrders;
