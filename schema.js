const graphql = require('graphql');

const User = require('../models/user.js'); // done
const Category = require('../models/shop/category.js');
const SubCategory = require('../models/shop/subCategory');
const Product = require('../models/shop/product.js'); // done
const Order = require('../models/shop/order.js');
const OrderItem = require('../models/shop/orderItem.js'); // done

const { UserType } = require('./types.js');
const { CategoryType } = require('./types.js');
const { SubCategoryType } = require('./types.js');
const { ProductType } = require('./types.js');
const { OrderType } = require('./types.js');
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
    // All categories
    allCategories: {
      type: new GraphQLList(CategoryType),
      resolve () {
        return Category.find({});
      }
    },
    // Sub-categories from a specific category
    subCategoriesByCategory: {
      type: new GraphQLList(SubCategoryType),
      args: {
        category: { type: GraphQLString }
      },
      resolve (_, args) {
        return SubCategory.find({ category: args.category });
      }
    },
    // All sub-categories
    allSubCategories: {
      type: new GraphQLList(SubCategoryType),
      resolve () {
        return SubCategory.find({});
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
        category: { type: GraphQLString },
        subCategory: { type: GraphQLString }
      },
      resolve (_, args) {
        return Product.find({
          category: args.category,
          subCategory: args.subCategory
        });
      }
    },
    allProducts: {
      type: new GraphQLList(ProductType),
      resolve () {
        return Product.find({});
      }
    },
    // One specific order
    orderByID: {
      type: OrderType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (_, args) {
        return Order.findById(args.id);
      }
    },
    // All orders made by a specific customer
    ordersByCustomerID: {
      type: new GraphQLList(OrderType),
      args: {
        id: { type: GraphQLID }
      },
      resolve (_, args) {
        return Order.find({ customerId: args.id });
      }
    },
    allOrders: {
      type: new GraphQLList(OrderType),
      resolve () {
        return Order.find({});
      }
    }
  }
});

// ******** Need to relook a mutations now that db fields have been changed. ********* //

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
