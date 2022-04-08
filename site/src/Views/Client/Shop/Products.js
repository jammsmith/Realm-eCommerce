import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

import ProductTile from '../../../Components/Tiles/ProductTile/ProductTile.js';
import LinkedHeading from '../../../Components/Headings/LinkedHeading.js';
import TileList from '../../../Components/Tiles/TileList.js';
import SingleSubCategoryByName from '../../../Components/Queries/SingleSubCategoryByName.js';
import useScrollToTop from '../../../hooks/useScrollToTop.js';

import { ShopBrowseWrapper, HeadingWrapper, Description } from './styledComponents.js';

// Return a selection of products in a specific sub-category
const Products = (props) => {
  useScrollToTop();
  const { url } = useRouteMatch();
  const { category, subCategory } = useParams();

  return (
    <SingleSubCategoryByName name={subCategory} category={category}>
      {
        subCategory => {
          const { name, description, products } = subCategory;
          return (
            <ShopBrowseWrapper>
              <HeadingWrapper>
                <LinkedHeading
                  text={_.startCase(name)}
                  headingSize='large'
                  buttonText={`back to ${_.startCase(category)}`}
                  linkTo={`/shop/browse/${category}`}
                />
              </HeadingWrapper>
              <Description>{description}</Description>
              <TileList>
                {
                  products.map((product, index) => {
                    return (
                      <ProductTile
                        key={index}
                        product={product}
                        linkTo={`${url}/${product._id}`}
                        {...props}
                      />
                    );
                  })
                }
              </TileList>
            </ShopBrowseWrapper>
          );
        }
      }
    </SingleSubCategoryByName>
  );
};

Products.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  addingToCart: PropTypes.object.isRequired,
  updateAddingToCart: PropTypes.func.isRequired,
  activeOrder: PropTypes.object,
  updateActiveOrder: PropTypes.func.isRequired,
  itemsInCart: PropTypes.array
};

export default Products;
