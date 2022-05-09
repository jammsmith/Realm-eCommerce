import React from 'react';
import { useHistory } from 'react-router-dom';

import Image from '../Image.js';
import Link from '../Link.js';

import {
  FooterOuterWrapper,
  FooterInner,
  FooterTopSection,
  TopSectionInner,
  TopSectionLinks,
  GetInTouch,
  SocialIcons,
  FindUsOnFacebook,
  MailIcon,
  FooterBottomSection,
  ContactWrapper,
  InfoLinksWrapper,
  Copyright
} from './FooterElements.js';

//
const Footer = () => {
  const history = useHistory();
  const copyrightDate = new Date().getFullYear();

  return (
    <>
      <FooterOuterWrapper>
        <FooterInner>
          <FooterTopSection>
            <Image
              src='/images/shop-front.jpeg'
              alt='Doves and Dandys shop front in Llandrindod Wells'
            />
            <TopSectionInner>
              <TopSectionLinks>
                <GetInTouch>
                  <SocialIcons>
                    <FindUsOnFacebook
                      src='/images/find-us-on-facebook.png'
                      onClick={() => window.open('https://www.facebook.com/Doves-Dandys-143717172379125', '_blank')}
                    />
                    <MailIcon
                      onClick={() => history.push('/contact-us')}
                    />
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
              <Link to={{ pathname: '/customer-info', state: { type: 'sizing-info' } }}>
                Sizing Info
              </Link>
              <Link to={{ pathname: '/customer-info', state: { type: 'payment-info' } }}>
                Payment Info
              </Link>
              <Link to={{ pathname: '/customer-info', state: { type: 'delivery-info' } }}>
                Delivery Info
              </Link>
              <Link to={{ pathname: '/customer-info', state: { type: 'returns-policy' } }}>
                Returns Policy
              </Link>
              <Link to={{ pathname: '/customer-info', state: { type: 'privacy-policy' } }}>
                Privacy Policy
              </Link>
              <Link to={{ pathname: '/customer-info', state: { type: 'faq' } }}>
                FAQ's
              </Link>
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
