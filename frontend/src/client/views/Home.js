import React from 'react';
import styled, { css } from 'styled-components';

import CategoryTile from '../components/home/CategoryTile';
import TextSection from '../components/home/TextSection';
import TestimonialCarousel from '../components/home/TestimonialCarousel';

import colours from '../../styles/colours';
const { dark, light } = colours;

const HomeWrapper = styled.div`
  position: relative;
`;

const ShopSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const SectionSpacer = styled.div`
  height: 2rem;
  ${props => props.spaceAbove &&
  css`
    margin-top: 2rem;
  `}
  ${props => props.spaceBelow &&
  css`
    margin-bottom: 2rem;
  `}
  ${props => props.dark &&
  css`
    background-color: ${dark};
    color: ${light};
  `}
`;

const Home = (props) => {
  return (
    <HomeWrapper>
      <SectionSpacer spaceBelow dark />
      <TextSection
        headingFontSize='3rem'
        heading='Makers of the finest bespoke, Victorian clothing and Old-West leather.'
        text='We specialise in individual designs and styles for both clothing and leather. We use only the finest materials available and all of our products are carefully researched and hand crafted by us.'
      />
      <SectionSpacer spaceBelow dark />
      <ShopSectionContainer>
        <CategoryTile
          imageSrc='/images/menswear-landing-page.jpg'
          imageAltText=''
          text='Gents Wear'
          linkTo='/shop/gents-wear'
        />
        <CategoryTile
          imageSrc='/images/womenswear-landing-page.jpg'
          imageAltText=''
          text='Ladies Wear'
          linkTo='/shop/ladies-wear'
        />
        <CategoryTile
          imageSrc='/images/old-west-leather.jpg'
          imageAltText=''
          text='Old West Leather'
          linkTo='/shop/old-west-leather'
        />
      </ShopSectionContainer>
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
    </HomeWrapper>
  );
};

export default Home;
