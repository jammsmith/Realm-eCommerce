import { gql } from '@apollo/client';

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    _id
    user_id
    name
    address
    email
    type
  }
`;

export const CATEGORY_DETAILS = gql`
  fragment CategoryDetails on Category {
    _id
    description
    image
    name
  }
`;

export const SUBCATEGORY_DETAILS = gql`
  fragment SubCategoryDetails on SubCategory {
    _id
    subCategory_id
    category
    description
    image
    name
  }
`;

export const PRODUCT_DETAILS = gql`
  fragment ProductDetails on Product {
    _id
    product_id
    category
    description
    image
    name
    numInStock
    price
    category
    subCategory
  }
`;

export const ORDER_DETAILS = gql`
  fragment OrderDetails on Order {
    _id
    order_id
    extraInfo
    paymentIntentId
    orderStatus
    paymentStatus
    dateCreated
    datePaid
    dateRefunded
    dateSent
    dateReceived
  }
`;

export const ORDER_ITEM_DETAILS = gql`
  fragment OrderItemDetails on OrderItem {
    _id
    orderItem_id
    size
    quantity
  }
`;

export const DELIVERY_DETAILS = gql`
  fragment DeliveryDetails on Delivery {
    _id
    delivery_id
    address
    firstName
    lastName
    email
    phone
    registerAccount
  }
`;
