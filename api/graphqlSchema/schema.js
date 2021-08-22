const graphql = require('graphql');

const User = require('../models/user.js');
const Product = require('../models/shop/product.js');
const OrderItem = require('../models/shop/orderItem.js');

const { UserType } = require('./types.js');
const { ProductType } = require('./types.js');
const { OrderItemType } = require('./types.js');

const convertScalarTypeToValue = require('../helpers/graphql.js');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} = graphql;

// Declare Root Query 'start points' ---->
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // User related queries -->
    userByID: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (_, args) {
        return User.findById(args.id);
      }
    },
    allUsers: {
      type: new GraphQLList(UserType),
      resolve () {
        return User.find({});
      }
    },
    // Single item of order
    orderItemByID: {
      type: OrderItemType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (_, args) {
        return OrderItem.findById(args.id);
      }
    },
    // Entire order made up of several items
    orderByOrderID: {
      type: new GraphQLList(OrderItemType),
      args: {
        id: { type: GraphQLID }
      },
      resolve (_, args) {
        return OrderItem.find({ orderId: args.id });
      }
    },
    orderByCustomerID: {
      type: new GraphQLList(OrderItemType),
      args: {
        id: { type: GraphQLID }
      },
      resolve (_, args) {
        return OrderItem.find({ userId: args.id });
      }
    },
    allOrders: {
      type: new GraphQLList(OrderItemType),
      resolve () {
        return OrderItem.find({});
      }
    },
    // Single product
    productByID: {
      type: ProductType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (_, args) {
        return Product.findById(args.id);
      }
    },
    // Multiple products
    productsByCategory: {
      type: new GraphQLList(ProductType),
      args: {
        category: { type: GraphQLString }
      },
      resolve (_, args) {
        return Product.find({ category: args.category });
      }
    },
    productsBySubCategory: {
      type: new GraphQLList(ProductType),
      args: {
        subCategory: { type: GraphQLString }
      },
      resolve (_, args) {
        return Product.find({ subCategory: args.subCategory });
      }
    },
    // All products
    allProducts: {
      type: new GraphQLList(ProductType),
      resolve () {
        return Product.find({});
      }
    }
    // Categories
    // subCategories: {
    //   type: SubCategoryEnumType, // need to define this enum
    //   resolve () {
    //     // find all subCategories that have the correct category
    //   }
    // }
  }
});

// Declare 'create, update and delete' mutations -->
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //
    // User related mutations -->
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve (_, args) {
        // ************ Should encrpt the password here and store the hashed version ************* //
        return new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password
        }).save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        key: { type: new GraphQLNonNull(GraphQLString) },
        stringValue: { type: GraphQLString },
        booleanValue: { type: GraphQLBoolean }
      },
      resolve (_, { userId, key, stringValue, booleanValue }) {
        const value = convertScalarTypeToValue(stringValue, booleanValue);
        return User.findByIdAndUpdate(userId, { [key]: value });
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, args) {
        return User.findByIdAndDelete(args.userId);
      }
    },
    //
    // Order related mutations -->
    addOrder: {
      type: OrderItemType,
      args: {
        size: { type: GraphQLString },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        orderId: { type: new GraphQLNonNull(GraphQLID) },
        productId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, args) {
        return new OrderItem({
          size: args.size,
          quantity: args.quantity,
          userId: args.userId,
          orderId: args.orderId,
          productId: args.productId
        }).save();
      }
    },
    updateOrder: {
      type: UserType,
      args: {
        orderId: { type: new GraphQLNonNull(GraphQLID) },
        key: { type: new GraphQLNonNull(GraphQLString) },
        stringValue: { type: GraphQLString },
        booleanValue: { type: GraphQLBoolean }
      },
      resolve (_, { orderId, key, stringValue, booleanValue }) {
        const value = convertScalarTypeToValue(stringValue, booleanValue);
        return User.findByIdAndUpdate(orderId, { [key]: value });
      }
    },
    deleteOrder: {
      type: OrderItemType,
      args: {
        orderId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, args) {
        return OrderItem.findByIdAndDelete(args.orderId);
      }
    },
    //
    // Product related mutations
    addProductToInventory: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        numInStock: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve (_, args) {
        return new Product({
          name: args.name,
          image: args.image,
          category: args.category,
          description: args.description,
          price: args.price,
          numInStock: args.numInStock
        }).save();
      }
    },
    updateProductInInventory: {
      type: ProductType,
      args: {
        productId: { type: new GraphQLNonNull(GraphQLID) },
        key: { type: new GraphQLNonNull(GraphQLString) },
        stringValue: { type: GraphQLString },
        integerValue: { type: GraphQLInt }
      },
      resolve (_, { productId, key, stringValue, integerValue }) {
        const value = convertScalarTypeToValue(stringValue, integerValue);
        return Product.findByIdAndUpdate(productId, { [key]: value });
      }
    },
    removeProductFromInventory: {
      type: ProductType,
      args: {
        productId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, args) {
        return Product.findByIdAndDelete(args.productId);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
