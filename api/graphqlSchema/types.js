const graphql = require('graphql');

const User = require('../models/user.js');
// const Category = require('../models/shop/category.js');
const SubCategory = require('../models/shop/subCategory');
const Product = require('../models/shop/product.js');
const Order = require('../models/shop/order.js');
const OrderItem = require('../models/shop/orderItem.js');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = graphql;

// A user of the website
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    orders: {
      type: new GraphQLList(OrderType),
      resolve (parent) {
        return Order.find({ customerId: parent.id });
      }
    }
  })
});

// A main category in the shop
const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    subCategories: {
      type: new GraphQLList(SubCategoryType),
      resolve (parent) {
        return SubCategory.find({ category: parent.name });
      }
    }
  })
});

// A secondary category (of a main category), in the shop
const SubCategoryType = new GraphQLObjectType({
  name: 'SubCategory',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    category: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve (parent) {
        return Product.find({ subCategory: parent.name });
      }
    }
  })
});

// One product for sale
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    numInStock: { type: GraphQLInt },
    category: { type: GraphQLString },
    subCategory: { type: GraphQLString }
  })
});

// One item in an order
const OrderItemType = new GraphQLObjectType({
  name: 'OrderItem',
  fields: () => ({
    id: { type: GraphQLID },
    size: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    order: {
      type: OrderType,
      resolve (parent) {
        return Order.findById(parent.orderId);
      }
    },
    product: {
      type: ProductType,
      resolve (parent) {
        return Product.findById(parent.productId);
      }
    }
  })
});

// Details of a whole order, either waiting in checkout or actually completed
const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    extraInfo: { type: GraphQLString },
    isPendingInCheckout: { type: GraphQLBoolean },
    isPaidFor: { type: GraphQLBoolean },
    isOrderConfirmed: { type: GraphQLBoolean },
    isDelivered: { type: GraphQLBoolean },
    customer: {
      type: UserType,
      resolve (parent) {
        return User.findById(parent.customerId);
      }
    },
    orderItems: {
      type: new GraphQLList(OrderItemType),
      resolve (parent) {
        return OrderItem.find({ orderId: parent.id });
      }
    }
  })
});

//

module.exports = {
  UserType,
  CategoryType,
  SubCategoryType,
  ProductType,
  OrderType,
  OrderItemType
};
