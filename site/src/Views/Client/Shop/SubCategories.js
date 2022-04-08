// External imports
import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import _ from 'lodash';

// Components
import LinkedHeading from '../../../Components/Headings/LinkedHeading.js';
import SubCategoryTile from '../../../Components/Tiles/CategoryTile.js';
import TileList from '../../../Components/Tiles/TileList.js';
import LoadingView from '../../../Components/LoadingView.js';
import { SINGLE_CATEGORY_BY_NAME } from '../../../graphql/queries.js';

import { ShopBrowseWrapper, HeadingWrapper, Description } from './styledComponents.js';

// Return a selection of sub-categories within the named category.
const SubCategories = () => {
  const { url } = useRouteMatch();
  const { category } = useParams();

  const { data } = useQuery(SINGLE_CATEGORY_BY_NAME, {
    variables: { name: category }
  });

  return (
    <ShopBrowseWrapper>
      <HeadingWrapper>
        <LinkedHeading
          text={_.startCase(category)}
          headingSize='large'
          linkTo='/shop'
          buttonText='Back to categories'
        />
      </HeadingWrapper>
      {
        data && data.category ? (
          <>
            <Description>{data.category.description}</Description>
            <TileList>
              {
                data.category.subCategories.map((subCategory, index) => {
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
        ) : <LoadingView />
      }
    </ShopBrowseWrapper>
  );
};

export default SubCategories;
