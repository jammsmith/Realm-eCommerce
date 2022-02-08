import React from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline } from 'react-icons/io5';

import {
  NavbarContainer,
  NavbarNavigation,
  NavbarBrand,
  NavbarCart,
  NavbarHomeLink,
  NavbarSpacer,
  NavbarLinksContainer,
  NavbarLinkList,
  NavbarLinkItem,
  NavbarLink,
  NavbarToggleIcon,
  LoginIcon
} from './NavbarElements';

const Navbar = ({ handleToggle, handleOpenLoginDialog }) => {
  return (
    <NavbarContainer>
      <NavbarNavigation>
        <div>
          <NavbarHomeLink to='/'>
            <NavbarBrand>Doves and Dandys Westernwear</NavbarBrand>
          </NavbarHomeLink>
        </div>
        <NavbarSpacer />
        <NavbarLinksContainer>
          <NavbarLinkList>
            <NavbarLinkItem>
              <NavbarLink className='link' to='/about-us'>
                About Us
              </NavbarLink>
            </NavbarLinkItem>
            <NavbarLinkItem>
              <NavbarLink className='link' to='/contact-us'>
                Contact Us
              </NavbarLink>
            </NavbarLinkItem>
            <NavbarLinkItem>
              <NavbarLink className='link' to='/contact-us'>
                Customer Info
              </NavbarLink>
            </NavbarLinkItem>
          </NavbarLinkList>
        </NavbarLinksContainer>
        <NavbarLinksContainer>
          <NavbarLinkList>
            <NavbarCart>
              <NavbarLink className='link' to='/shop/cart'>
                Cart <IoCartOutline />
              </NavbarLink>
            </NavbarCart>
            <LoginIcon size={25} onClick={handleOpenLoginDialog} />
          </NavbarLinkList>
        </NavbarLinksContainer>
        <NavbarToggleIcon size={25} onClick={handleToggle} />
      </NavbarNavigation>
    </NavbarContainer>
  );
};

Navbar.propsTypes = {
  handleToggle: PropTypes.func.isRequired,
  handleOpenLoginDialog: PropTypes.func.isRequired
};

export default Navbar;
