import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoPersonCircleOutline } from 'react-icons/io5';

import colours from '../../styles/colours.js';
import fonts from '../../styles/fonts.js';

const { light, dark } = colours;
const { fancyHeading, normalHeading } = fonts;

export const NavbarContainer = styled.header`
  background: ${light};
  width: 100%;
  height: 60px;
`;

export const NavbarNavigation = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.5rem;
`;

export const NavbarBrand = styled.h1`
  font-family: ${fancyHeading};
  font-size: 1.5rem;
  margin-bottom: 0;
`;

export const NavbarHomeLink = styled(Link)`
  color: ${dark};
`;

export const NavbarSpacer = styled.div`
  flex: 1;
`;

export const NavbarLinksContainer = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

export const NavbarLinkList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
`;

export const NavbarLinkItem = styled.li`
  color: ${dark};
  font-size: 1.15rem;
  padding: 0.75rem;
`;

export const NavbarLink = styled(Link)`
  color: ${dark};
  font-family: ${normalHeading};
  text-decoration: none;

  :active,
  :hover {
    color: ${dark};
  }
`;

export const NavbarCart = styled.li`
  font-size: 1.15rem;
  padding-left: 4rem;
`;

export const NavbarToggleIcon = styled(FaBars)`
  color: ${dark};
  display: block;
  :hover,
  :active {
    cursor: pointer;
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const LoginIcon = styled(IoPersonCircleOutline)`
  margin-left: 1.5rem;
  color: ${dark};
  :hover,
  :active {
    cursor: pointer;
  }
`;
