import React from 'react';
import _ from 'lodash';

import CategoryTile from '../../../Components/Tiles/CategoryTile.js';
import TileList from '../../../Components/Tiles/TileList.js';
import TextSection from '../../../Components/TextSection.js';
import TestimonialCarousel from '../../../Components/Testimonials/TestimonialCarousel.js';
import SectionSpacer from '../../../Components/SectionSpacer.js';
import AllCategories from '../../../Components/Queries/AllCategories.js';

const Home = (props) => {
  return (
    <>
      <SectionSpacer spaceBelow dark />
      <TextSection
        headingFontSize='3rem'
        heading='Makers of the finest bespoke, Victorian clothing and Old-West leather.'
        text='We specialise in individual designs and styles for both clothing and leather. We use only the finest materials available and all of our products are carefully researched and hand crafted by us.'
      />
      <SectionSpacer spaceBelow dark />
      <TileList>
        <AllCategories>
          {categories => categories.map((category, index) => {
            const { name } = category;
            return (
              <CategoryTile
                key={index}
                title={_.startCase(name)}
                image={`/images/${name}-landing-page.jpg`}
                linkTo={`/shop/${name}`}
              />
            );
          })}
        </AllCategories>
      </TileList>
      <SectionSpacer spaceBelow spaceAbove dark />
      <TextSection
        headingFontSize='2rem'
        heading='Our client base starts at home in the U.K, but it is truly international.'
        text='We manufacture and supply our products for TV, living history & re-enactment groups, enthusiasts, or those just dressing up for fun! All through Scandinavia, Central Europe and as far as the USA.'
        secondaryText='Please take a minute to read some of our customer testimonials below...'
      />
      <SectionSpacer spaceBelow spaceAbove dark />
      <TestimonialCarousel />
      <SectionSpacer />
    </>
  );
};

export default Home;
