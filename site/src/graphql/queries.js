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
  query($id: ID!) {
    user(query: { _id: $id }) {
      ...UserDetails
    }
  }
`;

export const USER_ORDERS = gql`
  ${USER_DETAILS}
  ${ORDER_DETAILS}
  ${ORDER_ITEM_DETAILS}
  query($id: ID!) {
    user(query: { _id: $id }) {
      ...UserDetails
      orders {
        ...OrderDetails
        orderItems {
          ...OrderItemDetails
          product {
            _id
            name
          }
        }
      }
    }
  }
`;

// Shop Categories
export const SINGLE_CATEGORY = gql`
${CATEGORY_DETAILS}
 query($id: ID, $name: String) {
   category(query: { _id: $id, name: $name, }) {
     ...CategoryDetails
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
 query($id: ID, $name: String) {
   subCategories(query: { _id: $id, name: $name }) {
     ...SubCategoryDetails
   }
 }
`;

export const SINGLE_SUBCATEGORY_AND_PRODUCTS = gql`
  ${SUBCATEGORY_DETAILS}
  ${PRODUCT_DETAILS}
  query($id: ID!) {
    subCategories(query: { _id: $id }) {
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
  ${SUBCATEGORY_DETAILS}
  query($id: ID!) {
    product(query: { _id: $id }) {
      ...SubCategoryDetails
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

export const PRODUCTS_IN_SUBCATEGORY = gql`
  ${PRODUCT_DETAILS}
  query($id: ID!) {
    subCategory(
      query: {_id: $id}
      sortBy: NUMINSTOCK_DESC
    ) {
      ...ProductDetails
    }
  }
`;

export const SINGLE_ORDER_DETAILED = gql`
  ${ORDER_DETAILS}
  ${ORDER_ITEM_DETAILS}
  ${PRODUCT_DETAILS}
  ${USER_DETAILS}
  query($id: ID!) {
    order(query: { _id: $id }) {
      ...OrderDetails
      orderItems {
        ...OrderItemDetails
        product {
          ...ProductDetails
        }
        customer {
          ...UserDetails
        }
      }
    }
  }
`;

export const SINGLE_ORDER_BASIC = gql`
  ${ORDER_DETAILS}
  query($id: ID!) {
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
