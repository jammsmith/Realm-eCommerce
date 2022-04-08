// External imports
import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import _ from 'lodash';

// Components
import LinkedHeading from '../../../Components/Headings/LinkedHeading.js';
import SubCategoryTile from '../../../Components/Tiles/CategoryTile.js';
import TileList from '../../../Components/Tiles/TileList.js';
import SingleCategoryByName from '../../../Components/Queries/SingleCategoryByName.js';

import { ShopBrowseWrapper, HeadingWrapper, Description } from './styledComponents.js';

// Return a selection of sub-categories within the named category.
const SubCategories = () => {
  const { url } = useRouteMatch();
  const { category } = useParams();

  return (
    <SingleCategoryByName name={category}>
      {
        category =>
          <ShopBrowseWrapper>
            <HeadingWrapper>
              <LinkedHeading
                text={_.startCase(category.name)}
                headingSize='large'
                linkTo='/shop'
                buttonText='Back to categories'
              />
            </HeadingWrapper>
            <Description>{category.description}</Description>
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
          </ShopBrowseWrapper>
      }
    </SingleCategoryByName>
  );
};

export default SubCategories;
