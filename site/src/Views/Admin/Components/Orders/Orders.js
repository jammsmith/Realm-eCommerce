import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import _ from 'lodash';

import OrderDetails from './OrderDetails.js';
import DDTable from '../../../../Components/Table/DDTable.js';
import Heading from '../../../../Components/Heading.js';
import { ADMIN_ORDERS } from '../../../../graphql/queries.js';

// Styled components
import { OrdersWrapper } from '../../styledComponents.js';

const Orders = () => {
  // Dialog state / handlers
  const [dialogOpen, setDialogOpen] = useState(false);
  const selectedOrderId = useRef('');
  const { data: adminOrders, error } = useQuery(ADMIN_ORDERS);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleOpenDialog = (orderId) => {
    selectedOrderId.current = orderId;
    setDialogOpen(true);
  };

  const columns = [
    { name: 'orderId', label: 'Order ID' },
    { name: 'product', label: 'Product' },
    { name: 'paymentStatus', label: 'Payment Status' },
    { name: 'orderStatus', label: 'Order Status' }
  ];
  let rows;

  try {
    const buildRows = (orderId, product, paymentStatus, orderStatus) => {
      return {
        orderId,
        product,
        paymentStatus: _.startCase(paymentStatus),
        orderStatus: _.startCase(orderStatus)
      };
    };

    if (adminOrders && adminOrders.orders && adminOrders.orders.length) {
      const { orders } = adminOrders;

      rows = orders.map(order => {
        let product = 'Multiple products';
        if (order.orderItems.length === 1) {
          product = order.orderItems[0].product.name;
        }

        return buildRows(
          order.order_id,
          product,
          order.paymentStatus,
          order.orderStatus
        );
      });
    } else if (error) {
      throw new Error('Graphql error:', error.message);
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <OrderDetails
        open={dialogOpen}
        handleClose={handleCloseDialog}
        orderId={selectedOrderId.current}
      />
      <OrdersWrapper>
        <Heading text='Orders' size='small' color='white' />
        {
          rows
            ? <DDTable
              rows={rows}
              columns={columns}
              size='small'
              handleRowClick={handleOpenDialog}
              style={{ marginTop: '1rem' }}
              />
            : 'no active orders'
        }
      </OrdersWrapper>
    </>
  );
};

export default Orders;
