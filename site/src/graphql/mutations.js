import gql from 'graphql-tag';
import {
  USER_DETAILS,
  // CATEGORY_DETAILS,
  // SUBCATEGORY_DETAILS,
  PRODUCT_DETAILS,
  ORDER_DETAILS,
  ORDER_ITEM_DETAILS
} from './fragments.js';

const mutations = {
  // AUTHORS
  AddUser: gql`
    ${USER_DETAILS}
    mutation(
      $_id: ObjectId!
      $user_id: String!
      $firstName: String,
      $lastName: String,
      $email: String,
      $password: String,
      $type: String!
    ) {
      insertOneUser(data: {
        _id: $_id
        user_id: $user_id,
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password,
        type: $type
      } ) {
        ...UserDetails
      }
    }
  `,
  UpdateUser: gql`
    ${USER_DETAILS}
    mutation(
      $id: ObjectId!,
      $firstName: String,
      $lastName: String,
      $email: String,
      $password: String,
      $type: String,
    ) {
      updateOneUser(
        query: { _id: $id },
        set: {
          firstName: $firstName,
          lastName: $lastName,
          email: $email,
          password: $password,
          type: $type,
        } ) {
        ...UserDetails
      }
    }
  `,
  UpdateUserOrders: gql`
    ${USER_DETAILS}
    mutation(
      $user_id: String!,
      $orders: [String!]
    ) {
      updateOneUser(
        query: { user_id: $user_id },
        set: {
          orders: { link: $orders }
        } ) {
        ...UserDetails
      }
    }
  `,
  DeleteUser: gql`
    ${USER_DETAILS}
    mutation($id: ObjectId!) {
      deleteOneUser(query: { _id: $id }) {
        ...UserDetails
      }
    }
  `,
  AddProductToInventory: gql`
    ${PRODUCT_DETAILS}
    mutation(
      $product_id: String!
      $name: String!,
      $image: String!,
      $category: String!,
      $subCategory: String!,
      $description: String!,
      $price: Int!,
      $numInStock: Int!,
    ) {
      insertOneProduct(data: {
        product_id: $product_id
        name: $name,
        image: $image,
        category: $category,
        subCategory: $subCategory,
        description: $description,
        price: $price,
        numInStock: $numInStock
        } ) {
          ...ProductDetails
      }
    }
  `,
  UpdateProductInInventory: gql`
    ${PRODUCT_DETAILS}
    mutation(
      $id: ObjectId!
      $name: String,
      $image: String,
      $category: String,
      $subCategory: String,
      $description: String,
      $price: Int,
      $numInStock: Int
    ) {
      updateOneProduct(
        query: { _id: id },
        set: {
          productId: $productId,
          name: $name,
          image: $image,
          category: $category,
          subCategory: $subCategory,
          description: $description,
          price: $price,
          numInStock: $numInStock
        } ) {
        ...ProductDetails
      }
    }
  `,
  RemoveProductFromInventory: gql`
    ${PRODUCT_DETAILS}
    mutation($id: ObjectId!) {
      deleteOneProduct(query: { _id: $id }) {
        ...ProductDetails
      }
    }
  `,
  CreateGuestOrder: gql`
    ${USER_DETAILS}
    ${PRODUCT_DETAILS}
    ${ORDER_DETAILS}
    ${ORDER_ITEM_DETAILS}
    mutation(
      $order_id: String!,
      $user_ObjectId: ObjectId!,
      $user_id: String!,
      $orderItem_id: String!,
      $product_id: String!,
    ) {
      insertOneOrder(data: {
        order_id: $order_id,
        isDelivered: false,
        isOrderConfirmed: false,
        isPaidFor: false,
        isPendingInCheckout: true,
        customer: {
          link: "user_id",
          create: {
            _id: $user_ObjectId,
            user_id: $user_id,
            type: "guest",
            orders: {
              link: [$order_id]
            }
          }
        },
        orderItems: {
          link: ["orderItem_id"],
          create: [{
            orderItem_id: $orderItem_id,
            quantity: 1,
            order: {
              link: $order_id
            }
            product: {
              link: $product_id
            }
          }]
        }
      } ) {
        customer {
          ...UserDetails
          orders {
            ...OrderDetails
            orderItems {
              ...OrderItemDetails
              product {
                ...ProductDetails
              }
            }
          }
        }
      }
    }
  `,
  CreateOrderForExistingCustomer: gql`
    ${USER_DETAILS}
    ${PRODUCT_DETAILS}
    ${ORDER_DETAILS}
    ${ORDER_ITEM_DETAILS}
    mutation(
      $order_id: String!,
      $user_id: String!,
      $orderItem_id: String!,
      $product_id: String!
    ) {
      insertOneOrder(data: {
        order_id: $order_id,
        isDelivered: false,
        isOrderConfirmed: false,
        isPaidFor: false,
        isPendingInCheckout: true,
        customer: {
          link: $user_id,
        },
        orderItems: {
          link: [$orderItem_id],
          create: [{
            orderItem_id: $orderItem_id,
            quantity: 1
            product: {
              link: $product_id
            }
          }]
        }
      }) {
        ...OrderDetails
        customer {
          ...UserDetails
          orders {
            ...OrderDetails
          }
        }
        orderItems {
          ...OrderItemDetails
          product {
            ...ProductDetails
          }
        }
      }
    }
  `,
  CreateNewOrderItem: gql`
    ${ORDER_ITEM_DETAILS}
    ${ORDER_DETAILS}
    ${PRODUCT_DETAILS}
    mutation(
      $orderItem_id: String!,
      $order_id: String!,
      $product_id: String!,
      $size: String,
      $quantity: Int = 1,
    ) {
      insertOneOrderItem(data: {
        orderItem_id: $orderItem_id,
        size: $size,
        quantity: $quantity,
        order: {
          link: $order_id
        },
        product: {
          link: $product_id
        }
      } ) {
        ...OrderItemDetails
        order {
          ...OrderDetails
        },
        product {
          ...ProductDetails
        }
      }
    }
  `,
  UpdateOrderItemsInOrder: gql`
    ${ORDER_ITEM_DETAILS}
    ${ORDER_DETAILS}
    ${PRODUCT_DETAILS}
    mutation(
      $order_id: String!,
      $orderItems: [String!]
    ) {
      updateOneOrder(
        query: { order_id: $order_id},
        set: {
          orderItems: { link: $orderItems }
        } ) {
        ...OrderDetails
        orderItems {
          ...OrderItemDetails
          product {
            ...ProductDetails
          }
        }
      }
    }
  `,
  UpdateOrder: gql`
    ${ORDER_DETAILS}
    mutation(
      $id: ObjectId!,
      $isDelivered: Boolean,
      $isOrderConfirmed: Boolean,
      $isPaidFor: Boolean,
      $isPendingInCheckout: Boolean,
      $extraInfo: String
    ) {
      updateOneOrder(
        query: { _id: $id },
        set: {
          isPendingInCheckout: $isPendingInCheckout,
          isPaidFor: $isPaidFor,
          isOrderConfirmed: $isOrderConfirmed,
          isDelivered: $isDelivered,
          extraInfo: $extraInfo
        } ) {
        ...OrderDetails
      }
    }
  `,
  DeleteOrder: gql`
    ${ORDER_DETAILS}
    mutation($id: ObjectId!) {
      deleteOneOrder(query: { _id: $id }) {
        ...OrderDetails
      }
    }
  `,
  UpdateItemInOrder: gql`
    ${ORDER_ITEM_DETAILS}
    ${PRODUCT_DETAILS}
    mutation(
      $id: ObjectId!,
      $size: String,
      $quantity: Int
    ) {
      updateOneOrderItem(
        query: { _id: $id },
        set: {
          size: $size,
          quantity: $quantity
        } ) {
        ...OrderItemDetails
        product {
          ...ProductDetails
        }
      }
    }
  `,
  DeleteOrderItem: gql`
    ${ORDER_ITEM_DETAILS}
    mutation(
      $orderItem_id: String!
    ) {
      deleteOneOrderItem(
        query: { orderItem_id: $orderItem_id }
      ) {
        ...OrderItemDetails
      }
    }
  `,
  UpdateOrderItemsArrayInOrder: gql`
    ${ORDER_DETAILS}
    mutation(
      $order_id: String!,
      $updatedOrderItemsArray: [String!]
    ) {
      updateOneOrder(
        query: { order_id:$order_id },
        set: {
          orderItems: { link: $updatedOrderItemsArray }
        }
      ) {
        ...OrderDetails
      }
    }
  `
};

export default mutations;
