import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import _ from 'lodash';

import ProductTile from '../../../Components/Tiles/ProductTile/ProductTile.js';
import LinkedHeading from '../../../Components/Headings/LinkedHeading.js';
import TileList from '../../../Components/Tiles/TileList.js';
import LoadingView from '../../../Components/LoadingView.js';
import { SINGLE_SUBCATEGORY_BY_NAME } from '../../../graphql/queries.js';
import useScrollToTop from '../../../hooks/useScrollToTop.js';

import { ShopBrowseWrapper, HeadingWrapper, Description } from './styledComponents.js';

// Return a selection of products in a specific sub-category
const Products = (props) => {
  useScrollToTop();
  const { url } = useRouteMatch();
  const { category, subCategory } = useParams();

  const { data } = useQuery(SINGLE_SUBCATEGORY_BY_NAME, {
    variables: { name: subCategory, category }
  });

  return (
    <ShopBrowseWrapper>
      <HeadingWrapper>
        <LinkedHeading
          text={_.startCase(subCategory)}
          headingSize='large'
          buttonText={`back to ${_.startCase(category)}`}
          linkTo={`/shop/browse/${category}`}
        />
      </HeadingWrapper>
      {
        data && data.subCategory ? (
          <>
            <Description>{data.subCategory.description}</Description>
            <TileList>
              {
                [...data.subCategory.products]
                  .sort((a, b) => b.numInStock - a.numInStock)
                  .map((product, index) => (
                    <ProductTile
                      key={index}
                      product={product}
                      linkTo={`${url}/${product._id}`}
                      {...props}
                    />
                  ))
              }
            </TileList>
          </>
        ) : <LoadingView />
      }
    </ShopBrowseWrapper>
  );
};

Products.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  addingToCart: PropTypes.object.isRequired,
  updateAddingToCart: PropTypes.func.isRequired,
  activeOrder: PropTypes.object,
  updateActiveOrder: PropTypes.func.isRequired,
  itemsInCart: PropTypes.array,
  currency: PropTypes.string.isRequired
};

export default Products;
