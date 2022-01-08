import { gql } from '@apollo/client';
import {
  USER_DETAILS,
  CATEGORY_DETAILS,
  SUBCATEGORY_DETAILS,
  PRODUCT_DETAILS,
  ORDER_DETAILS,
  ORDER_ITEM_DETAILS
} from './fragments.js';

// Users
export const SINGLE_USER = gql`
  ${USER_DETAILS}
  query($id: ObjectId!) {
    user(query: { _id: $id }) {
      ...UserDetails
    }
  }
`;

export const USER_DETAILED = gql`
  ${USER_DETAILS}
  ${ORDER_DETAILS}
  ${ORDER_ITEM_DETAILS}
  ${PRODUCT_DETAILS}
  query($id: ObjectId!) {
    user(query: { _id: $id }) {
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
`;

// Shop Categories
export const SINGLE_CATEGORY = gql`
${CATEGORY_DETAILS}
${SUBCATEGORY_DETAILS}
 query($name: String!) {
   category(query: { name: $name, }) {
     ...CategoryDetails
     subCategories {
       ...SubCategoryDetails
     }
   }
 }
`;

export const ALL_CATEGORIES = gql`
  ${CATEGORY_DETAILS}
  query {
    categories {
      ...CategoryDetails
    }
  }
`;

export const ALL_CATEGORIES_AND_SUBCATEGORIES = gql`
  ${CATEGORY_DETAILS}
  ${SUBCATEGORY_DETAILS}
  query {
    categories {
      ...CategoryDetails
      subCategories {
        ...SubCategoryDetails
      }
    }
  }
`;

export const SINGLE_SUBCATEGORY = gql`
${SUBCATEGORY_DETAILS}
${PRODUCT_DETAILS}
 query($name: String!, $category: String!) {
   subCategory(query: { name: $name, category: $category }) {
     ...SubCategoryDetails
     products {
       ...ProductDetails
     }
   }
 }
`;

export const ALL_SUBCATEGORIES = gql`
  ${SUBCATEGORY_DETAILS}
  query {
    subCategories {
      ...SubCategoryDetails
    }
  }
`;

// Shop products
export const SINGLE_PRODUCT = gql`
  ${PRODUCT_DETAILS}
  query($id: ObjectId!) {
    product(query: { _id: $id }) {
      ...ProductDetails
    }
  }
`;

export const ALL_PRODUCTS = gql`
  ${PRODUCT_DETAILS}
  query {
    products {
      ...ProductDetails
    }
  }
`;

export const SINGLE_ORDER_DETAILED = gql`
  ${ORDER_DETAILS}
  ${ORDER_ITEM_DETAILS}
  ${PRODUCT_DETAILS}
  ${USER_DETAILS}
  query($id: ObjectId!) {
    order(query: { _id: $id }) {
      ...OrderDetails
      customer {
        ...UserDetails
      }
      orderItems {
        ...OrderItemDetails
        product {
          ...ProductDetails
        }
      }
    }
  }
`;

export const SINGLE_ORDER_BASIC = gql`
  ${ORDER_DETAILS}
  query($id: ObjectId!) {
    order(query: { _id: $id }) {
      ...OrderDetails
    }
  }
`;

export const ALL_ORDERS = gql`
  ${ORDER_DETAILS}
  query {
    orders {
      ...OrderDetails
    }
  }
`;

export const LAST_REF_IDS = gql`
  query {
    users(limit: 1, sortBy: USER_ID_DESC) {
      user_id
    }
    orders(limit: 1, sortBy: ORDER_ID_DESC) {
      order_id
    }
    orderItems(limit: 1, sortBy: ORDERITEM_ID_DESC) {
      orderItem_id
    }
    subCategories(limit: 1, sortBy: SUBCATEGORY_ID_DESC) {
      subCategory_id
    }
    products(limit: 1, sortBy: PRODUCT_ID_DESC) {
      product_id
    }
  }
`;
