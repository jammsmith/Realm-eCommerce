// This function is the endpoint's request handler.
exports = async function (userId) {
  const userFromDb = await context.services
    .get('mongodb-atlas')
    .db('dovesAndDandysDB')
    .collection('users')
    .findOne({ _id: BSON.ObjectId(userId) });

  return JSON.parse(JSON.stringify(userFromDb));
};
