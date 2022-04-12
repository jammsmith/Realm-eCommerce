import React from 'react';
import _ from 'lodash';

import ActionButton from '../../../Components/ActionButton.js';
import TextSection from '../../../Components/TextSection.js';
import TestimonialCarousel from './Testimonials/TestimonialCarousel.js';
import SectionSpacer from '../../../Components/SectionSpacer.js';
import colours from '../../../styles/colours.js';

import { GoToShopWrapper, ImagesWrapper, PrimaryImage, SecondaryImages, SecondaryImage } from './styledComponents.js';

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
      <GoToShopWrapper>
        <ImagesWrapper>
          <PrimaryImage src='/images/gents-wear-landing-page.jpg' />
          <SecondaryImages>
            <SecondaryImage src='/images/ladies-wear-landing-page.jpg' />
            <SecondaryImage src='/images/old-west-leather-landing-page.jpg' />
          </SecondaryImages>
        </ImagesWrapper>
        <ActionButton
          text='Browse Shop'
          linkTo='/shop'
          customStyles={{
            height: '5rem',
            backgroundColor: colours.dark,
            borderRadius: '10px',
            color: colours.light,
            fontSize: '1.5rem'
          }}
        />
      </GoToShopWrapper>
      <SectionSpacer spaceBelow spaceAbove dark />
      <TextSection
        headingFontSize='1.75rem'
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
