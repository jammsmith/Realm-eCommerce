import React from 'react';
import _ from 'lodash';

import Heading from '../../../Components/Headings/Heading.js';
import CategoryTile from '../../../Components/Tiles/CategoryTile.js';
import TileList from '../../../Components/Tiles/TileList.js';
import AllCategories from '../../../Components/Queries/AllCategories.js';

import { ShopBrowseWrapper, HeadingWrapper } from './styledComponents.js';

// Return a selection of all categories.
const Categories = () => {
  return (
    <AllCategories>
      {
        categories => (
          <ShopBrowseWrapper>
            <HeadingWrapper>
              <Heading text='Browse Categories' size='large' />
            </HeadingWrapper>
            <TileList>
              {categories.map((category, index) => {
                const { name } = category;
                return (
                  <CategoryTile
                    key={index}
                    title={_.startCase(name)}
                    image={`/images/${name}-landing-page.jpg`}
                    linkTo={`/shop/browse/${name}`}
                  />
                );
              })}
            </TileList>
          </ShopBrowseWrapper>
        )
      }
    </AllCategories>
  );
};

export default Categories;
