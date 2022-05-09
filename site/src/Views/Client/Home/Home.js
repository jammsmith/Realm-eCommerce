import React from 'react';

import Services from './Services.js';
import Testimonials from './Testimonials.js';
import ActionButton from '../../../Components/ActionButton.js';
import TextSection from '../../../Components/TextSection.js';
import SectionSpacer from '../../../Components/SectionSpacer.js';
import colours from '../../../styles/colours.js';
import useBreakpoints from '../../../hooks/useBreakpoints.js';

import {
  GoToShopWrapper,
  ImagesWrapper,
  PrimaryImage,
  SecondaryImages,
  SecondaryImage,
  TertiaryImage,
  LargeScreenImageAndButton,
  HomeBottomWrapper
} from './styledComponents.js';

const Home = () => {
  const { isMd, isLg } = useBreakpoints();

  let buttonStyles = {
    height: '5rem',
    backgroundColor: colours.dark,
    borderRadius: '10px',
    color: colours.light,
    fontSize: '1.5rem',
    width: '220px'
  };
  if (isLg) {
    buttonStyles = {
      ...buttonStyles,
      display: 'relative',
      right: '1rem'
    };
  }
  return (
    <>
      {(isMd || isLg) && <SectionSpacer spaceAbove />}
      <TextSection
        headingFontSize='3rem'
        heading='Makers of the finest bespoke, Victorian clothing and Old-West leather.'
        text='We specialise in individual designs and styles for both clothing and leather. We use only the finest materials available and all of our products are carefully researched and hand crafted by us.'
      />
      <SectionSpacer spaceAbove spaceBelow={(isMd || isLg)} dark />
      <GoToShopWrapper>
        <ImagesWrapper>
          <PrimaryImage src='/images/gents-wear-landing-page.jpg' alt='Gents Wear' />
          <SecondaryImages>
            <SecondaryImage src='/images/ladies-wear-landing-page.jpg' alt='Ladies Wear' />
            <SecondaryImage src='/images/old-west-leather-landing-page.jpg' alt='Old West Leather' />
          </SecondaryImages>
        </ImagesWrapper>
        {
          isLg ? (
            <LargeScreenImageAndButton>
              <TertiaryImage src='https://placedog.net/200/276' alt='Westernwear' />
              <ActionButton
                text='Browse Shop'
                linkTo='/shop'
                customStyles={buttonStyles}
              />
            </LargeScreenImageAndButton>
          ) : (
            <ActionButton
              text='Browse Shop'
              linkTo='/shop'
              customStyles={buttonStyles}
            />
          )
        }
      </GoToShopWrapper>
      <SectionSpacer spaceBelow spaceAbove dark />
      <HomeBottomWrapper>
        <Services />
        <Testimonials />
      </HomeBottomWrapper>
      <SectionSpacer spaceBelow />
    </>
  );
};

export default Home;
