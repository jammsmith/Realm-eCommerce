import React from 'react';
import styled from 'styled-components';
import { IoLogoFacebook, IoMailOutline } from 'react-icons/io5';

import Link from './Link';
import Image from './Image';

import colours from '../../styles/colours';

const { dark, light } = colours;

const FooterOuterWrapper = styled.div`
  background-color: ${dark};
  color: ${light};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
`;

const FooterTextWrapper = styled.div`

`;

// BLOCK 1:
// Brand name
// Shop address
// Contact details
const BrandAndContactWrapper = styled.div`
  display: flex;
  font-size: 1rem;
  flex-direction: row;
  align-items: flex-end;
  gap: 1rem;
  max-width: 60%;
`;

// BLOCK 2:
// CTA for online shop browse
// Testimonials
// Email sign-up

const CTALink = styled.h4`
  margin: 1rem;
`;

const GetInTouch = styled.div`
display: flex;
flex-direction: column;
flex-wrap: no-wrap;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: no-wrap;
`;

// BLOCK 3:
// Copyright statement
// T & C's
// Sizing Info
// Privacy Policy
// Payment Info
const InfoWrapper = styled.div``;

const Footer = () => {
  return (
    <>
      <FooterOuterWrapper>
        <Image src='/images/shop-front.jpeg' width='40%' />
        <FooterTextWrapper>
          <BrandAndContactWrapper>
            <div>
          Doves & Dandys Westernwear<br />
          Unit 1, Old Town Hall Workshops<br />
          Beaufort Road<br />
          Llandrindod Wells<br />
          Powys<br />
          LD1 5DL<br /><br />
              <p style={{ margin: 0 }}>(+44) 7869 375541</p>
            </div>
          </BrandAndContactWrapper>
          <div>
            <Link to='/shop'><CTALink>Online Shop</CTALink></Link>
            <Link to='/testimonials'><CTALink>Testimonials</CTALink></Link>
            <GetInTouch>
              <CTALink>Get in touch</CTALink>
              <SocialIcons>
                <IoLogoFacebook style={{ fontSize: '2rem' }} />
                <IoMailOutline style={{ fontSize: '2rem' }} />
              </SocialIcons>
            </GetInTouch>

          </div>
          <InfoWrapper>
            <h6>Sizing Info</h6>
            <h6>Payment Info</h6>
            <h6>Delivery Info</h6>
            <h6>Returns Policy</h6>
            <h6>Privacy Policy</h6>
            <h6>T & C's</h6>
          </InfoWrapper>
        </FooterTextWrapper>
      </FooterOuterWrapper>
      <copyright>Copyright statement</copyright>
    </>
  );
};

export default Footer;
