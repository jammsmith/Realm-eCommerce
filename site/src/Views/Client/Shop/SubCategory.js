// External imports
import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

// Components
import ProductTile from '../../../Components/Tiles/ProductTile/ProductTile.js';
import TextSection from '../../../Components/TextSection.js';
import SingleSubCategory from '../../../Components/Queries/SingleSubCategory.js';

// Return a selection of products in a specific sub-category
const SubCategory = () => {
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
                  const { id, name, image, price, numInStock } = product;
                  return (
                    <ProductTile
                      key={index}
                      name={name}
                      price={price}
                      image={image}
                      numInStock={numInStock}
                      linkTo={`${url}/${id}`}
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

export default SubCategory;