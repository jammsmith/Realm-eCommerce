import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';

import Heading from '../../../Components/Headings/Heading.js';
import CategoryTile from '../../../Components/Tiles/CategoryTile.js';
import TileList from '../../../Components/Tiles/TileList.js';
import { ALL_CATEGORIES } from '../../../graphql/queries.js';
import LoadingView from '../../../Components/LoadingView.js';

import { ShopBrowseWrapper, HeadingWrapper } from './styledComponents.js';

// Return a selection of all categories.
const Categories = () => {
  const { data } = useQuery(ALL_CATEGORIES);
  return (
    <ShopBrowseWrapper>
      <HeadingWrapper>
        <Heading text='Browse Categories' size='large' />
      </HeadingWrapper>
      {
        data && data.categories ? (
          <TileList>
            {data.categories.map((category, index) => {
              const { name } = category;
              return (
                <CategoryTile
                  key={index}
                  title={_.startCase(name)}
                  image={`/images/${name}-landing-page.jpg`}
                  linkTo={`/shop/browse/${name}`}
                  dataReady
                />
              );
            })}
          </TileList>
        ) : <LoadingView />
      }
    </ShopBrowseWrapper>
  );
};

export default Categories;
