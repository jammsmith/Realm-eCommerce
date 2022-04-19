import React from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline } from 'react-icons/io5';

import CurrencySelection from './CurrencySelection.js';
import MyAccountMenu from './MyAccountMenu.js';
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
  BrowseShop,
  BrowseShopLink
} from './NavbarElements';

const Navbar = ({ handleToggle }) => {
  return (
    <NavbarContainer>
      <NavbarNavigation>
        <NavbarHomeLink to='/'>
          <NavbarBrand>Doves and Dandys Westernwear</NavbarBrand>
        </NavbarHomeLink>
        <NavbarSpacer />
        <NavbarLinksContainer>
          <NavbarLinkList>
            <BrowseShop>
              <BrowseShopLink to='/shop'>
                Browse Shop
              </BrowseShopLink>
            </BrowseShop>
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
              <NavbarLink className='link' to='/customer-info'>
                Customer Info
              </NavbarLink>
            </NavbarLinkItem>
          </NavbarLinkList>
        </NavbarLinksContainer>
        <NavbarLinksContainer>
          <NavbarLinkList>
            <NavbarLinkItem>
              <NavbarCart>
                <NavbarLink className='link' to='/shop/cart'>
                Cart <IoCartOutline size={30} />
                </NavbarLink>
              </NavbarCart>
            </NavbarLinkItem>
            <NavbarLinkItem>
              <CurrencySelection />
            </NavbarLinkItem>
            <MyAccountMenu />
          </NavbarLinkList>
        </NavbarLinksContainer>
        <NavbarToggleIcon size={25} onClick={handleToggle} />
      </NavbarNavigation>
    </NavbarContainer>
  );
};

Navbar.propsTypes = {
  handleToggle: PropTypes.func.isRequired
};

export default Navbar;
