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
      $id: ObjectId!
      $user_id: ObjectId!
      $firstName: String,
      $lastName: String,
      $email: String,
      $password: String,
      $type: String!
    ) {
      insertOneUser(data: {
        _id: $id,
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
  DeleteUser: gql`
    ${USER_DETAILS}
    mutation(
      $id: ObjectId!
    ) {
      deleteOneUser(
        query: { _id: $id }
      ) {
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
      $numInStock: Int,
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
    mutation(
      $id: ObjectId!
    ) {
      deleteOneProduct(
        query: { _id: $id }
      ) {
        ...ProductDetails
      }
    }
  `,
  AddOrder: gql`
    ${ORDER_DETAILS}
    mutation(
      $order_id: String!,
      $isDelivered: Boolean = false,
      $isOrderConfirmed: Boolean = false,
      $isPaidFor: Boolean = false,
      $isPendingInCheckout: Boolean = false,
    ) {
      insertOneOrder(
        data: { order_id: $order_id },
      ) {
        ...OrderDetails
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
        query: { _id: id },
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
    mutation(
      $id: ObjectId!
    ) {
      deleteOneOrder(
        query: { _id: $id }
      ) {
        ...OrderDetails
      }
    }
  `,
  AddItemToOrder: gql`
    ${ORDER_ITEM_DETAILS}
    ${PRODUCT_DETAILS}
    ${USER_DETAILS}
    mutation(
      $orderItem_id: String!
      $size: String,
      $quantity: Int!,
    ) {
      insertOneOrderItem(
        data: {
          orderItem_id: $orderItem_id,
          size: $size,
          quantity: $quantity,
        } ) {
      ...OrderItemDetails
      product {
        ...ProductDetails
      }
      customer {
        ...UserDetails
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
        products {
          ...ProductDetails
        }  
      }
    }
  `,
  DeleteItemFromOrder: gql`
    ${ORDER_ITEM_DETAILS}
    mutation(
      $id: ObjectId!
    ) {
      deleteItemFromOrder(
        query: { _id: $id }
      ) {
        ...OrderItemDetails
      } 
    }
  `
};

export default mutations;
