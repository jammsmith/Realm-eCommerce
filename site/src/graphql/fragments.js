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
  fragment SubCategoryDetails on SubCategory {
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
  fragment SubCategoryDetails on SubCategory {
    _id
    order_id
    isDelivered
    isOrderConfirmed
    isPaidFor
    isPendingInCheckout
    extraInfo
  }
`;

export const ORDER_ITEM_DETAILS = gql`
  fragment SubCategoryDetails on SubCategory {
    _id
    size
    quantity
  }
`;
