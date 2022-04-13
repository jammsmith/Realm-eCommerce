import React from 'react';

import Heading from '../../../Components/Headings/Heading.js';
import SectionSpacer from '../../../Components/SectionSpacer.js';
import useScrollToTop from '../../../hooks/useScrollToTop.js';

import {
  OuterWrapper,
  ContentWrapper,
  Image,
  ImageInsideText,
  TextWrapper,
  TextSection
} from './styledComponents.js';

const AboutUs = () => {
  useScrollToTop();
  return (
    <>
      <SectionSpacer dark spaceBelow />
      <OuterWrapper>
        <Heading text='About Us' />
        <ContentWrapper>
          <TextWrapper>
            <TextSection>Howdy Folks!</TextSection>
            <TextSection>
            Because of our passion and interest for the Old West and also being lucky enough to do Re-enactment for many years, we have enjoyed developing a broad range of products that reflect careful research into the different periods, locations, and people of The Old West.
            </TextSection>
            <ImageInsideText
              src='/images/steve-and-di-about-us.JPG'
              alt='The shop owners, Di and Steve in full Old-Western dress'
            />
            <TextSection>
            From our own experience over the years, we found it very difficult to find exactly what we want. You can spend a lot of money on something for which you make do,  or it doesn't quite fit how you want it to, or wrong it’s the colour or  worse still, it isn't period correct. We also found it hard to get quality that would stand up to the demands of Re-enactment.
            </TextSection>
            <TextSection>
            On western weekends and festivals, we'd look at different stores, trying to find period clothes and quality western leather products.  We found that only a few stalls would carry things we liked.  It was this hole in the market that inspired us to create Doves and Dandy’s Westernwear. We offer quality at what we believe are good prices. My wife Diane has been making quality clothing for the last thirty years.  I have used my knowledge of the Old West and developed leather working skills to work alongside her, so that we can offer quality clothing and leather products to a high standard.
            </TextSection>
            <TextSection>
            When we make an item for a new or returning customer, we can't say how much enjoyment we get from the happiness expressed, when they try on or wear their new item we have made for the first time. Many of our commissions come from word of mouth and that is the best recommendation we can get.
            </TextSection>
            <TextSection>
            We take great care and pride in every crafted item we create, using only the Best Quality Materials from the U.K and the USA. So, if you decide you want us to make something for you, it would be our pleasure, as we enjoy our craft.
            </TextSection>
            <TextSection>
            We hope you enjoy browsing our website, and look forward to hearing from you.
            </TextSection>
            <TextSection>Happy Trails</TextSection>
            <TextSection>Steve & Diane</TextSection>
          </TextWrapper>
          <Image
            src='/images/steve-and-di-about-us.JPG'
            alt='The shop owners, Di and Steve in full Old-Western dress'
          />
        </ContentWrapper>
      </OuterWrapper>
    </>
  );
};

export default AboutUs;
