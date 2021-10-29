import { gql } from '@apollo/client';

// Users
export const userById = gql`
  query($id: ID!) {
    userById(id: $id) {
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
`;

// Shop categories
export const allCategories = gql`
  query {
    allCategories {
      id
      name
      description
      image
      subCategories {
        name
      }
    }
  }
`;

export const categoryByName = gql`
 query($name: String!) {
   categoryByName(name: $name) {
     id
     name
     description
     image
     subCategories {
       id
       name
       description
       image
     }
   }
 }
`;

export const singleSubCategory = gql`
  query($name: String!, $category: String!) {
    singleSubCategory(name: $name, category: $category) {
      id
      name
      description
      image
      products {
        id
        name
        image
        description
        price
        numInStock
      }
    }
  }
`;

export const allSubCategories = gql`
  query {
    allSubCategories {
      id
      name
      description
      image
      category
    }
  }
`;

// Shop products
export const productById = gql`
  query($id: ID!) {
    productById(id: $id) {
      id
      name
      image
      description
      price
      numInStock
      category
      subCategory
    }
  }
`;

export const productsByCategory = gql`
  query($category: String!) {
    productsByCategory(category: $category) {
      id
      name
      image
      description
      price
      numInStock
      category
      subCategory
    }
  }
`;

export const productsBySubCategory = gql`
  query($category: String!, $subCategory: String!) {
    productsBySubCategory(category: $category, subCategory: $subCategory) {
      id
      name
      image
      description
      price
      numInStock
      category
      subCategory
    }
  }
`;

export const allProducts = gql`
  query {
    allProducts {
      id
      name
      image
      description
      price
      numInStock
      category
      subCategory
    }
  }
`;

// Orders
export const ordersByCustomer = gql`
  query($id: ID!) {
    userById(id: $id) {
      id
      firstName
      lastName
      email
      orders {
        id
        extraInfo
        isPendingInCheckout
        isPaidFor
        isOrderConfirmed
        isDelivered
        orderItems {
          id
          size
          quantity
          product {
            id
            name
            price
          }
        }
      }
    }
  }
`;

export const orderById = gql`
  query($id: ID!) {
    orderById(id: $id) {
      id
      extraInfo
      isPendingInCheckout
      isPaidFor
      isOrderConfirmed
      isDelivered
      customer {
        id
        firstName
        lastName
        email
        orders {
          id
        }
      }
      orderItems {
        id
        size
        quantity
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const allOrders = gql`
  query {
    allOrders {
      id
      customer {
        firstName
        lastName
        email
      }
      orderItems {
        quantity
        product {
          name
        }
      }
    }
  }
`;
