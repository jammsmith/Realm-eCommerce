import { gql } from '@apollo/client';

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    _id
    user_id
    firstName
    lastName
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
    deliveryAddress
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

/*
  Not using this anymore (in favour of deliveryAddress as a single string on Order Type).
  Keep in case we want to add in the future.
*/
// export const DELIVERY_ADDRESS_DETAILS = gql`
//   fragment DeliveryAddressDetails on DeliveryAddress {
//     _id
//     address_id
//     addressPart1
//     addressPart2
//     postcode
//     country
//   }
// `;
