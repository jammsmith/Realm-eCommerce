// External imports
import React from 'react';
import PropTypes from 'prop-types';

// Custom styled components
import {
  DrawerNav,
  DrawerItems,
  DrawerLink,
  Spacer,
  OuterFlexContainer,
  LinkContainer
} from './SideDrawerElements.js';

// Show a menu that appears from the side on small screens
const SideDrawer = ({ handleDrawerLinkClick }) => {
  return (
    <DrawerNav>
      <OuterFlexContainer>
        <DrawerItems>
          <img
            src='/images/site-decoration/western-flourish-top.png'
            alt=''
            style={{ width: '100%' }}
          />
          <Spacer />
          <LinkContainer>
            <DrawerLink to='/' onClick={handleDrawerLinkClick}>
              Home
            </DrawerLink>
          </LinkContainer>
          <Spacer />
          <LinkContainer>
            <DrawerLink
              to='/shop/old-west-leather'
              onClick={handleDrawerLinkClick}
            >
              Old West Leather
            </DrawerLink>
          </LinkContainer>
          <LinkContainer>
            <DrawerLink to='/shop/gents-wear' onClick={handleDrawerLinkClick}>
              Gents Wear
            </DrawerLink>
          </LinkContainer>
          <LinkContainer>
            <DrawerLink to='/shop/ladies-wear' onClick={handleDrawerLinkClick}>
              Ladies Wear
            </DrawerLink>
          </LinkContainer>
          <LinkContainer>
            <DrawerLink to='/shop/accessories' onClick={handleDrawerLinkClick}>
              Accessories
            </DrawerLink>
          </LinkContainer>
          <Spacer />
          <LinkContainer>
            <DrawerLink to='/contact-us' onClick={handleDrawerLinkClick}>
              Contact Us
            </DrawerLink>
          </LinkContainer>
          <LinkContainer>
            <DrawerLink to='/cart' onClick={handleDrawerLinkClick}>
              Cart
            </DrawerLink>
          </LinkContainer>
          <Spacer />
          <img
            src='/images/site-decoration/western-flourish-bottom.png'
            alt=''
            style={{ width: '100%' }}
          />
        </DrawerItems>
      </OuterFlexContainer>
    </DrawerNav>
  );
};

SideDrawer.propTypes = {
  handleDrawerLinkClick: PropTypes.func.isRequired
};

export default SideDrawer;
