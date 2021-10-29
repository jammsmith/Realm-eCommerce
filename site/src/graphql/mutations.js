import gql from 'graphql-tag';

const mutations = {
  // AUTHORS
  AddUser: gql`
    mutation(
      $lastName: String!
      $email: String
    ) {
      addUser(
        lastName: $lastName
        email: $email
      ) {
        id
        firstName
        lastName
        email
        password
        isAdmin
        orders {
          id
          isPendingInCheckout
          orderItems {
            id
            size
            quantity
            product {
              id
              name
              image
              price
            }
          }
        }
      }
    }
  `,
  UpdateUser: gql`
    mutation(
      $userId: ID!,
      $firstName: String,
      $lastName: String,
      $email: String,
      $password: String,
      $isAdmin: Boolean,
    ) {
      updateUser(
        userId: $userId,
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password,
        isAdmin: $isAdmin
      ) {
        id,
        firstName,
        lastName,
        email,
        isAdmin
      }
    }
  `,
  DeleteUser: gql`
    mutation(
      $userId: ID!
    ) {
      deleteUser(
        userId: $userId
      ) {
        id
      }
    }
  `,
  AddProductToInventory: gql`
    mutation(
      $name: String!,
      $image: String!,
      $category: String!,
      $subCategory: String!,
      $description: String!,
      $price: Int!,
      $numInStock: Int!,
    ) {
      addProductToInventory(
        name: $name,
        image: $image,
        category: $category,
        subCategory: $subCategory,
        description: $description,
        price: $price,
        numInStock: $numInStock
      ) {
        id,
        name,
        image,
        category,
        subCategory,
        description,
        price,
        numInStock
      }
    }
  `,
  UpdateProductInInventory: gql`
    mutation(
      $productId: ID!,
      $name: String,
      $image: String,
      $category: String,
      $subCategory: String,
      $description: String,
      $price: Int,
      $numInStock: Int,
    ) {
      updateProductInInventory(
        productId: $productId,
        name: $name,
        image: $image,
        category: $category,
        subCategory: $subCategory,
        description: $description,
        price: $price,
        numInStock: $numInStock
      ) {
        id,
        name,
        image,
        category,
        subCategory,
        description,
        price,
        numInStock
      }
    }
  `,
  RemoveProductFromInventory: gql`
    mutation(
      $productId: ID!
    ) {
      removeProductFromInventory(
        productId: $productId
      ) {
        id
      }
    }
  `,
  AddOrder: gql`
    mutation(
      $customerId: ID!,
    ) {
      addOrder(
        customerId: $customerId,
      ) {
        id,
        isPendingInCheckout,
        isPaidFor,
        isOrderConfirmed,
        isDelivered,
        customer {
          id
        }
      }
    }
  `,
  UpdateOrder: gql`
    mutation(
      $orderId: ID!,
      $isPendingInCheckout: Boolean,
      $isPaidFor: Boolean,
      $isOrderConfirmed: Boolean,
      $isDelivered: Boolean,
      $extraInfo: String
    ) {
      updateOrder(
        orderId: $orderId,
        isPendingInCheckout: $isPendingInCheckout,
        isPaidFor: $isPaidFor,
        isOrderConfirmed: $isOrderConfirmed,
        isDelivered: $isDelivered,
        extraInfo: $extraInfo
      ) {
        id,
        isPendingInCheckout,
        isPaidFor,
        isOrderConfirmed,
        isDelivered,
        extraInfo
      }
    }
  `,
  DeleteOrder: gql`
    mutation(
      $orderId: ID!
    ) {
      deleteOrder(
        orderId: $orderId
      ) {
        id
      }
    }
  `,
  AddItemToOrder: gql`
    mutation(
      $size: String,
      $quantity: Int!,
      $orderId: ID!,
      $productId: ID!
    ) {
      addItemToOrder(
        size: $size,
        quantity: $quantity,
        orderId: $orderId,
        productId: $productId
      ) {
        id,
        size,
        quantity,
        order {
          id
          customer {
            id
            firstName
            lastName
          }
        },
        product {
          id
        }
      }
    }
  `,
  UpdateItemInOrder: gql`
    mutation(
      $orderItemId: ID!,
      $size: String,
      $quantity: Int
    ) {
      updateItemInOrder(
        orderItemId: $orderItemId,
        size: $size,
        quantity: $quantity
      ) {
        id,
        size,
        quantity,
        order {
          id
        },
        product {
          id
        }
      }
    }
  `,
  DeleteItemFromOrder: gql`
    mutation(
      $orderItemId: orderItemId
    ) {
      deleteItemFromOrder(
        orderItemId: $orderItemId
      ) {
        id
      }
    }
  `
};

export default mutations;
