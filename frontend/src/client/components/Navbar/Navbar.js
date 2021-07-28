import React from 'react';
// import { FaHome } from 'react-icons/fa';
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
  NavbarToggleIcon
} from './NavbarElements';

const Navbar = props => {
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
              <NavbarLink className='link' to='/about-us'>
                Cart <IoCartOutline />
              </NavbarLink>
            </NavbarCart>
          </NavbarLinkList>
        </NavbarLinksContainer>
        <NavbarToggleIcon size={25} onClick={props.handleToggleClick} />
      </NavbarNavigation>
    </NavbarContainer>
  );
};

export default Navbar;
