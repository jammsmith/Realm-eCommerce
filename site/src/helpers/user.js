export const getActiveOrderFromUser = (user) => {
  console.log('user in helper', user);
  if (user && user.orders) {
    const activeOrder = user.orders.find(order => order.isPendingInCheckout === true);
    if (activeOrder) {
      return activeOrder;
    } else {
      console.log(`User ID ${user.id} does not have an active order`);
    }
  } else {
    console.log(`User ID ${user} has no orders`);
  }
};
