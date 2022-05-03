import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { RealmAppContext } from '../../realmApolloClient.js';
import SectionSpacer from '../SectionSpacer.js';
import { isAuthenticated, isAdmin } from '../../helpers/auth.js';

import {
  DrawerNav,
  DrawerItems,
  DrawerLink as Link,
  LinkContainer
} from './SideDrawerElements.js';

const DrawerLink = ({ url, label, handleClick, handleClickComplete }) => {
  let handleLinkClick;

  if (handleClickComplete) {
    handleLinkClick = () => {
      handleClick();
      handleClickComplete();
    };
  } else {
    handleLinkClick = handleClick;
  }
  return (
    <LinkContainer>
      <Link
        to={url}
        onClick={handleLinkClick}
      >
        {label}
      </Link>
    </LinkContainer>
  );
};
DrawerLink.propTypes = {
  url: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired
  ]),
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClickComplete: PropTypes.func
};

// Show a menu that appears from the side on small screens
const SideDrawer = ({ handleDrawerLinkClick }) => {
  const app = useContext(RealmAppContext);

  const primaryLinks = [
    { url: '/shop', label: 'Browse Shop' },
    { url: '/about-us', label: 'About Us' },
    { url: '/contact-us', label: 'Contact Us' },
    { url: '/customer-info', label: 'Customer Info' }
  ];

  let secondaryLinks = [
    { url: '/shop/cart', label: 'My Cart' }
  ];

  if (isAuthenticated(app.currentUser)) {
    secondaryLinks.push({ url: '/', label: 'Logout' });
    if (isAdmin(app.currentUser)) {
      secondaryLinks.push({ url: '/admin', label: 'Admin Dashboard' });
    }
  } else {
    secondaryLinks = [
      ...secondaryLinks,
      { url: '/login', label: 'Login' },
      { url: { pathname: '/login', state: { form: 'register' } }, label: 'Register' }
    ];
  }

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
              handleClickComplete={link.label === 'Logout' ? () => app.logOut() : null}
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
