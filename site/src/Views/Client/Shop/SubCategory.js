// External imports
import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

// Components
import ProductTile from '../../../Components/Tiles/ProductTile/ProductTile.js';
import TextSection from '../../../Components/TextSection.js';
import SingleSubCategory from '../../../Components/Queries/SingleSubCategory.js';

// Return a selection of products in a specific sub-category
const SubCategory = ({ handleAddToCart, itemsInCart, addingToCart }) => {
  const { url } = useRouteMatch();
  const { category, subCategory } = useParams();

  return (
    <SingleSubCategory name={subCategory} category={category}>
      {
        subCategory => {
          const { name, description, products } = subCategory;
          return (
            <>
              <TextSection heading={_.startCase(name)} text={description} />
              {
                products.map((product, index) => {
                  return (
                    <ProductTile
                      key={index}
                      product={product}
                      handleAddToCart={handleAddToCart}
                      itemsInCart={itemsInCart}
                      addingToCart={addingToCart}
                      linkTo={`${url}/${product._id}`}
                    />
                  );
                })
              }
            </>
          );
        }
      }
    </SingleSubCategory>
  );
};

SubCategory.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  itemsInCart: PropTypes.object,
  isAddingToCart: PropTypes.bool.isRequired
};

export default SubCategory;
