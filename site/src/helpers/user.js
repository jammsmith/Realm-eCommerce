export const getActiveOrderFromUser = (user) => {
  if (user && user.orders && user.orders.length > 0) {
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
