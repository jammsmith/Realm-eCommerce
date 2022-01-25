export const getCartSubTotal = (order) => {
  let subTotal;
  const productTotals = order.orderItems.map(item => item.quantity * item.product.price);
  const reducer = (prevValue, currentValue) => prevValue + currentValue;

  if (productTotals) {
    subTotal = productTotals.reduce(reducer);
  }

  return subTotal;
};
