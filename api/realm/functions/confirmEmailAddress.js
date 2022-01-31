// This function is the endpoint's request handler.
exports = function ({ query }, response) {
  // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
  const { arg1, arg2 } = query;
  console.log('arg1, arg2: ', arg1, arg2);

  // const result = context.functions.execute('function_name', arg1, arg2);

  // You can use 'context' to interact with other Realm features.
  // Accessing a value:
  // var x = context.values.get("value_name");

  // Querying a mongodb service:
  // const doc = context.services.get("mongodb-atlas").db("dbname").collection("coll_name").findOne();
};
