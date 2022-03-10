import React from 'react';
// import PropTypes from 'prop-types';
// import { useQuery } from '@apollo/client';
// import _ from 'lodash';
//
// import DDTable from '../../../Components/Table/DDTable.js';
// import useDDMutation from '../../../hooks/useDDMutation.js';
// import mutations from '../../../graphql/mutations.js';
// import { ADMIN_ORDERS } from '../../../graphql/queries.js';

// Styled components
import { OrdersWrapper } from '../styledComponents.js';

const OrdersTable = () => {
  // const { data, error } = useQuery(ADMIN_ORDERS);
  //
  // const columns = ['Order ID', 'Product', 'Payment Status', 'Order Status'];
  // let rows;
  //
  // try {
  //   const buildRows = (orderId, product, paymentStatus, orderStatus) => {
  //     return {
  //       orderId,
  //       product,
  //       paymentStatus: _.startCase(paymentStatus),
  //       orderStatus: _.startCase(orderStatus)
  //     };
  //   };
  //
  //   if (data && data.orders && data.orders.length) {
  //     const { orders } = data;
  //
  //     rows = orders.map(order => {
  //       let product = 'multiple';
  //       if (order.orderItems.length === 1) {
  //         product = order.orderItems.product.name;
  //       }
  //
  //       return buildRows(
  //         order.order_id,
  //         product,
  //         order.paymentStatus,
  //         order.orderStatus
  //       );
  //     });
  //   } else if (error) {
  //     throw new Error('Graphql error:', error.message);
  //   }
  // } catch (err) {
  //   console.error(err);
  // }

  return (
    <OrdersWrapper>
      Orders Table
      {/*
        rows
          ? <DDTable
            rows={rows}
            columns={columns}
            />
          : 'no active orders'
      */}
    </OrdersWrapper>
  );
};

// OrdersTable.propTypes = {
//
// };

export default OrdersTable;
