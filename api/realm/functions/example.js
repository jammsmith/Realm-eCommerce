exports = (arg1, arg2) => {
  // Accessing application's values:
  const x = context.values.get('value_name');

  // Accessing a mongodb service:
  const collection = context.services.get('mongodb-atlas').db('dbname').collection('coll_name');
  collection.findOne({ owner_id: context.user.id }).then((doc) => {
    // do something with doc
  });

  // To call other named functions:
  const result = context.functions.execute('function_name', arg1, arg2);

  return { arg1, arg2 };
};
