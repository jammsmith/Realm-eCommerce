// External imports
import React from 'react';
import PropTypes from 'prop-types';

import SectionSpacer from '../SectionSpacer.js';
import {
  DrawerNav,
  DrawerItems,
  DrawerLink as Link,
  LinkContainer
} from './SideDrawerElements.js';

const DrawerLink = ({ url, label, handleClick }) => (
  <LinkContainer>
    <Link
      to={url}
      onClick={handleClick}
    >
      {label}
    </Link>
  </LinkContainer>
);
DrawerLink.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

// Show a menu that appears from the side on small screens
const SideDrawer = ({ handleDrawerLinkClick }) => {
  const primaryLinks = [
    { url: '/shop/browse/old-west-leather', label: 'Old West Leather' },
    { url: '/shop/browse/gents-wear', label: 'Gents Wear' },
    { url: '/shop/browse/ladies-wear', label: 'Ladies Wear' },
    { url: '/shop/browse/accessories', label: 'Accessories' }
  ];
  const secondaryLinks = [
    { url: '/shop/cart', label: 'My Cart' },
    { url: '/my-account', label: 'My Account' },
    { url: '/contact-us', label: 'Contact Us' }
  ];
  return (
    <DrawerNav>
      <DrawerItems>
        <SectionSpacer light spaceBelow />
        <DrawerLink
          url='/'
          label='Home'
          handleClick={handleDrawerLinkClick}
        />
        <SectionSpacer light spaceBelow />
        {
          primaryLinks.map((link, index) => (
            <DrawerLink
              key={index}
              url={link.url}
              label={link.label}
              handleClick={handleDrawerLinkClick}
            />
          ))
        }
        <SectionSpacer light spaceBelow />
        {
          secondaryLinks.map((link, index) => (
            <DrawerLink
              key={index}
              url={link.url}
              label={link.label}
              handleClick={handleDrawerLinkClick}
            />
          ))
        }
      </DrawerItems>
    </DrawerNav>
  );
};

SideDrawer.propTypes = {
  handleDrawerLinkClick: PropTypes.func.isRequired
};

export default SideDrawer;
