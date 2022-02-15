exports = async function (userId) {
  const db = context.services
    .get('mongodb-atlas')
    .db('dovesAndDandysDB');

  const user = await db.collection('users').findOne({ _id: BSON.ObjectId(userId) });

  user.orders = await db.collection('orders')
    .find({ customer: user.user_id })
    .toArray();

  for (let i = 0; i < user.orders.length; i++) {
    const order = user.orders[i];

    const orderItems = db.collection('orderitems')
      .find({ order: order.order_id })
      .toArray()
      .then(async items => {
        for (let i = 0; i < items.length; i++) {
          const product = await db.collection('products').findOne({ product_id: items[i].product });
          items[i].product = product;
        }
        return items;
      });

    order.orderItems = await Promise.resolve(orderItems);
  }

  return JSON.parse(JSON.stringify(user));
};
