import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

import ProductTile from '../../../Components/Tiles/ProductTile/ProductTile.js';
import TileList from '../../../Components/Tiles/TileList.js';
import TextSection from '../../../Components/TextSection.js';
import SingleSubCategoryByName from '../../../Components/Queries/SingleSubCategoryByName.js';

// Return a selection of products in a specific sub-category
const SubCategory = (props) => {
  const { url } = useRouteMatch();
  const { category, subCategory } = useParams();

  return (
    <SingleSubCategoryByName name={subCategory} category={category}>
      {
        subCategory => {
          const { name, description, products } = subCategory;
          return (
            <>
              <TextSection heading={_.startCase(name)} text={description} align='left' />
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
            </>
          );
        }
      }
    </SingleSubCategoryByName>
  );
};

SubCategory.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  addingToCart: PropTypes.object.isRequired,
  updateAddingToCart: PropTypes.func.isRequired,
  activeOrder: PropTypes.object,
  updateActiveOrder: PropTypes.func.isRequired,
  itemsInCart: PropTypes.array
};

export default SubCategory;
