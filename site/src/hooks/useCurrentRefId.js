// Get custom ID's to use as references in MongoDB realm
import { useQuery } from '@apollo/client';
import { LAST_REF_IDS } from '../graphql/queries.js';

const useCurrentRefId = () => {
  const { data } = useQuery(LAST_REF_IDS);

  let userId;
  let orderId;
  let orderItemId;

  if (data && data.users) {
    if (data.users.length) {
      userId = data.users[0].user_id;
    } else {
      userId = 'user-001';
    }
    if (data.orders.length) {
      orderId = data.orders[0].order_id;
    } else {
      orderId = 'order-001';
    }
    if (data.orderItems.length) {
      orderItemId = data.orderItems[0].orderItem_id;
    } else {
      orderItemId = 'orderItem-001';
    }
  }

  return { userRef: userId, orderRef: orderId, orderItemRef: orderItemId };
};

export default useCurrentRefId;
