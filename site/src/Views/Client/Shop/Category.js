// External imports
import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import _ from 'lodash';

// Components
import TextSection from '../../../Components/TextSection.js';
import SubCategoryTile from '../../../Components/Tiles/CategoryTile.js';
import TileList from '../../../Components/Tiles/TileList.js';
import SingleCategory from '../../../Components/Queries/SingleCategory.js';

// Return a selection of sub-categories within the named category.
const Category = () => {
  const { url } = useRouteMatch();
  const { category } = useParams();

  return (
    <SingleCategory name={category}>
      {
        category =>
          <>
            <TextSection heading={_.startCase(category.name)} text={category.description} />
            <TileList>
              {
                category.subCategories.map((subCategory, index) => {
                  const { name, image } = subCategory;
                  return (
                    <SubCategoryTile
                      key={index}
                      title={_.startCase(name)}
                      image={image}
                      linkTo={`${url}/${name}`}
                    />
                  );
                })
              }
            </TileList>
          </>
      }
    </SingleCategory>
  );
};

export default Category;
