import React from 'react';

import Heading from '../../../Components/Headings/Heading.js';
import useScrollToTop from '../../../hooks/useScrollToTop.js';

import {
  OuterWrapper,
  ContactDetailsWrapper,
  DetailsItem,
  DetailsText,
  MailIcon,
  PhoneIcon,
  AddressIcon
} from './styledComponents.js';

const ContactUs = () => {
  useScrollToTop();
  return (
    <>
      <OuterWrapper>
        <Heading text='Contact Us' />
        <div>
          <p>
          If you would like contact us, we would love to hear from you. Our preferred method of contact is by email with your request or question. We will get back to you as soon as possible.
          </p>
          <p>No appointment necessary!</p>
          <br />
        </div>
        <ContactDetailsWrapper>
          <div>
            <DetailsItem>
              <MailIcon />
              <DetailsText>dovesanddandys@outlook.com</DetailsText>
            </DetailsItem>
          </div>
          <DetailsItem>
            <PhoneIcon />
            <DetailsText>+44 7869 375541</DetailsText>
          </DetailsItem>
          <DetailsItem>
            <AddressIcon />
            <div>
              <DetailsText>Doves & Dandys Westernwear</DetailsText>
              <DetailsText>Unit 1, Old Town Hall Workshops</DetailsText>
              <DetailsText>Beaufort Road</DetailsText>
              <DetailsText>Llandrindod Wells</DetailsText>
              <DetailsText>Powys</DetailsText>
              <DetailsText>LD1 5DL</DetailsText>
            </div>
          </DetailsItem>
        </ContactDetailsWrapper>
      </OuterWrapper>
    </>
  );
};

export default ContactUs;
