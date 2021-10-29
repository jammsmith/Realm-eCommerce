// External components
import React from 'react';
import { IoLogoFacebook, IoMailOutline } from 'react-icons/io5';

// Components
import Link from '../Link';
import Image from '../Image';

// Custom styled components
import {
  FooterOuterWrapper,
  FooterInner,
  FooterTopSection,
  TopSectionInner,
  TopSectionLinks,
  GetInTouch,
  SocialIcons,
  FooterBottomSection,
  ContactWrapper,
  InfoLinksWrapper,
  Copyright
} from './FooterElements.js';

//
const Footer = () => {
  const copyrightDate = new Date().getFullYear();
  return (
    <>
      <FooterOuterWrapper>
        <FooterInner>
          <FooterTopSection>
            <Image
              src='/images/shop-front.jpeg'
              alt='Doves and Dandys shop front in Llandrindod'
            />
            <TopSectionInner>
              <TopSectionLinks>
                <Link to='/shop'>
                  Online Shop
                </Link>
                <Link to='/testimonials'>
                  Testimonials
                </Link>
                <GetInTouch>
                  <h6 style={{ textDecoration: 'underline' }}>Get in touch</h6>
                  <SocialIcons>
                    <IoLogoFacebook style={{ fontSize: '2rem' }} />
                    <IoMailOutline style={{ fontSize: '2rem' }} />
                  </SocialIcons>
                </GetInTouch>
              </TopSectionLinks>
            </TopSectionInner>
          </FooterTopSection>
          <FooterBottomSection>
            <ContactWrapper>
              <div>
                Doves & Dandys Westernwear
                <br />
                Unit 1, Old Town Hall Workshops
                <br />
                Beaufort Road
                <br />
                Llandrindod Wells
                <br />
                Powys
                <br />
                LD1 5DL
                <br />
                <br />
                <p style={{ margin: 0 }}>(+44) 7869 375541</p>
              </div>
            </ContactWrapper>
            <InfoLinksWrapper>
              <Link to='/sizing-info'>Sizing Info</Link>
              <Link to='/payment-info'>Payment Info</Link>
              <Link to='/delivery-info'>Delivery Info</Link>
              <Link to='/returns-policy'>Returns Policy</Link>
              <Link to='/privacy-policy'>Privacy Policy</Link>
              <Link to='/terms-and-conditions'>T & C's</Link>
            </InfoLinksWrapper>
          </FooterBottomSection>
        </FooterInner>
      </FooterOuterWrapper>
      <Copyright>
        &copy; <span>{copyrightDate}</span> Doves and Dandys
      </Copyright>
    </>
  );
};

export default Footer;
