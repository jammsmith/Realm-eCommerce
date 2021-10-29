const graphql = require('graphql');

// Mongoose models
const User = require('../models/user.js');
const Category = require('../models/shop/category.js');
const SubCategory = require('../models/shop/subCategory');
const Product = require('../models/shop/product.js');
const Order = require('../models/shop/order.js');
const OrderItem = require('../models/shop/orderItem.js');

// Graphql types
const { UserType } = require('./types.js');
const { CategoryType } = require('./types.js');
const { SubCategoryType } = require('./types.js');
const { ProductType } = require('./types.js');
const { OrderType } = require('./types.js');
const { OrderItemType } = require('./types.js');

// Helpers

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
    userById: {
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
    // A single category
    categoryByName: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString }
      },
      resolve (_, args) {
        return Category.findOne({ name: args.name });
      }
    },
    // All categories
    allCategories: {
      type: new GraphQLList(CategoryType),
      resolve () {
        return Category.find({});
      }
    },
    // Specific sub-category
    singleSubCategory: {
      type: SubCategoryType,
      args: {
        name: { type: GraphQLString },
        category: { type: GraphQLString }
      },
      resolve (_, args) {
        return SubCategory.findOne({ name: args.name, category: args.category });
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
    productById: {
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
    orderById: {
      type: OrderType,
      args: {
        id: { type: GraphQLID }
      },
      resolve (_, args) {
        return Order.findById(args.id);
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

// Declare 'create, update and delete' mutations -->
// Could do with adding category/sub-category add, update, delete mutations too.
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    //
    // User related mutations -->
    addUser: {
      type: UserType,
      resolve (_, args) {
        return new User().save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean }
      },
      resolve (_, args) {
        return User.findByIdAndUpdate(args.userId, {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
          isAdmin: args.isAdmin
        });
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
    // Inventory related mutations
    addProductToInventory: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        subCategory: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        numInStock: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve (_, args) {
        return new Product({
          name: args.name,
          image: args.image,
          category: args.category,
          subCategory: args.subCategory,
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
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        category: { type: GraphQLString },
        subCategory: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        numInStock: { type: GraphQLInt }
      },
      resolve (_, args) {
        return Product.findByIdAndUpdate(args.productId, {
          name: args.name,
          image: args.image,
          category: args.category,
          subCategory: args.subCategory,
          description: args.description,
          price: args.price,
          numInStock: args.numInStock
        });
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
    },
    //
    // Order related mutations -->
    addOrder: {
      type: OrderType,
      args: {
        customerId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, args) {
        return new Order({
          customerId: args.customerId
        }).save();
      }
    },
    updateOrder: {
      type: OrderType,
      args: {
        orderId: { type: new GraphQLNonNull(GraphQLID) },
        isPendingInCheckout: { type: GraphQLBoolean },
        isPaidFor: { type: GraphQLBoolean },
        isOrderConfirmed: { type: GraphQLBoolean },
        isDelivered: { type: GraphQLBoolean },
        extraInfo: { type: GraphQLString }
      },
      resolve (_, args) {
        return Order.findByIdAndUpdate(args.orderId, {
          isPendingInCheckout: args.isPendingInCheckout,
          isPaidFor: args.isPaidFor,
          isOrderConfirmed: args.isOrderConfirmed,
          isDelivered: args.isDelivered,
          extraInfo: args.extraInfo
        });
      }
    },
    deleteOrder: {
      type: OrderType,
      args: {
        orderId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, args) {
        return Order.findByIdAndDelete(args.orderId);
      }
    },
    addItemToOrder: {
      type: OrderItemType,
      args: {
        size: { type: GraphQLString },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        orderId: { type: new GraphQLNonNull(GraphQLID) },
        productId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, args) {
        return new OrderItem({
          size: args.size,
          quantity: args.quantity,
          orderId: args.orderId,
          productId: args.productId
        }).save();
      }
    },
    updateItemInOrder: {
      type: OrderItemType,
      args: {
        orderItemId: { type: new GraphQLNonNull(GraphQLID) },
        size: { type: GraphQLString },
        quantity: { type: GraphQLInt }
      },
      resolve (_, args) {
        return OrderItem.findByIdAndUpdate(args.orderId, {
          size: args.size,
          quantity: args.quantity
        });
      }
    },
    deleteItemFromOrder: {
      type: OrderItemType,
      args: {
        orderItemId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve (_, args) {
        return OrderItem.findByIdAndDelete(args.orderItemId);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
