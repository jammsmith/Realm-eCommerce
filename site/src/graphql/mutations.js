import gql from 'graphql-tag';
import {
  USER_DETAILS,
  ORDER_DETAILS,
  ORDER_ITEM_DETAILS,
  PRODUCT_DETAILS,
  DELIVERY_DETAILS
} from './fragments.js';

const mutations = {
  // AUTHORS
  AddUser: gql`
    ${USER_DETAILS}
    mutation(
      $_id: ObjectId!,
      $user_id: String!,
      $name: String,
      $address: String,
      $email: String,
      $type: String!
    ) {
      insertOneUser(data: {
        _id: $_id,
        user_id: $user_id,
        name: $name,
        address: $address,
        email: $email,
        type: $type,
      } ) {
        ...UserDetails
      }
    }
  `,
  AddUserWithOrders: gql`
    ${USER_DETAILS}
    ${ORDER_DETAILS}
    ${ORDER_ITEM_DETAILS}
    ${PRODUCT_DETAILS}
    mutation(
      $_id: ObjectId!,
      $user_id: String!,
      $name: String,
      $address: String,
      $email: String,
      $type: String!,
      $orders: [String]
    ) {
      insertOneUser(data: {
        _id: $_id,
        user_id: $user_id,
        name: $name,
        address: $address,
        email: $email,
        type: $type,
        orders: { 
          link: $orders
        }
      } ) {
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
  `,
  UpdateUser: gql`
    ${USER_DETAILS}
    mutation(
      $id: ObjectId!,
      $name: String,
      $address: String,
      $email: String,
      $type: String,
    ) {
      updateOneUser(
        query: { _id: $id },
        set: {
          name: $name,
          address: $address,
          email: $email,
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
      $dateCreated: DateTime!
    ) {
      insertOneOrder(data: {
        order_id: $order_id,
        orderStatus: "pendingInCart",
        paymentStatus: "notAttempted"
        dateCreated: $dateCreated
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
      $product_id: String!,
      $dateCreated: DateTime!
    ) {
      insertOneOrder(data: {
        order_id: $order_id,
        orderStatus: "pendingInCart",
        paymentStatus: "notAttempted"
        dateCreated: $dateCreated
        customer: {
          link: $user_id,
        },
        orderItems: {
          link: ["orderItem_id"], 
          create: [{
            orderItem_id: $orderItem_id,
            quantity: 1,
            order: {
              link: $order_id
            },
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
      $quantity: Int = 1
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
  UpdateOrder: gql`
    ${ORDER_DETAILS}
    ${ORDER_ITEM_DETAILS}
    ${PRODUCT_DETAILS}
    mutation(
      $id: ObjectId!,
      $extraInfo: String,
      $paymentIntentId: String,
      $orderStatus: String,
      $paymentStatus: String,
      $dateCreated: DateTime,
      $datePaid: DateTime,
      $dateRefunded: DateTime,
      $dateSent: DateTime,
      $dateReceived: DateTime
    ) {
      updateOneOrder(
        query: { _id: $id },
        set: {
          extraInfo: $extraInfo,
          paymentIntentId: $paymentIntentId
          orderStatus: $orderStatus,
          paymentStatus: $paymentStatus,
          dateCreated: $dateCreated,
          datePaid: $datePaid,
          dateRefunded: $dateRefunded,
          dateSent: $dateSent,
          dateReceived: $dateReceived
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
    ${ORDER_DETAILS}
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
        order {
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
  AddDeliveryDetailsToOrder: gql`
    ${ORDER_DETAILS}
    ${DELIVERY_DETAILS}
    mutation(
      $order_id: String!,
      $delivery_id: String!,
      $address: String,
      $firstName: String!,
      $lastName: String!,
      $email: String!,
      $phone: Int,
      $registerAccount: Boolean
    ) {
      updateOneOrder(
        query: { order_id: $order_id },
        set: {
          delivery: {
            link: "delivery_id",
            create: {
              delivery_id: $delivery_id
              address: $address
              firstName: $firstName
              lastName: $lastName
              email: $email
              phone: $phone
              registerAccount: $registerAccount
            }
          }
        }
      ) {
        ...OrderDetails,
        delivery {
          ...DeliveryDetails
        }
      }
    }
  `
};

export default mutations;
