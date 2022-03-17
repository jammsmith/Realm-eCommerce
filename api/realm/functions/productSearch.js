
/*
  This function is run when a GraphQL Query is made requesting your
  custom field name. The return value of this function is used to
  populate the resolver generated from your Payload Type.

  This function expects the following input object:

  {
    "type": "object",
    "title": "MyCustomResolverInput",
    "properties": {
      "name": {
        "type": "string"
      }
    },
    "required": ["name"]
  }

  And the following payload object:

  {
    "type": "object",
    "title": "MyCustomResolverResult",
    "properties": {
      "hello": {
        "type": "string"
      }
    }
  }
*/

exports = async (name) => {
  const products = context.services
    .get('mongodb-atlas')
    .db('dovesAndDandysDB')
    .collection('products');

  const searchParams = name ? { name: { $regex: name, $options: '$i' } } : {};
  // find all products that contain the name input regardless of capitalisation
  const dbProducts = await products.find(searchParams).toArray();

  return JSON.parse(JSON.stringify(dbProducts));
};
