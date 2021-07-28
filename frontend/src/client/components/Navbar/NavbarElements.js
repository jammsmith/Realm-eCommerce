import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import colours from '../../../styles/colours';
import fonts from '../../../styles/fonts';

const { primary, light, dark } = colours;
const { fancyHeading, normalHeading } = fonts;

export const NavbarContainer = styled.header`
  background: ${light};
  width: 100%;
  height: 80px;
`;

export const NavbarNavigation = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
`;

export const NavbarBrand = styled.h1`
  font-family: ${fancyHeading};
  font-size: 1.75rem
`;

export const NavbarHomeLink = styled(Link)`
  color: ${primary};
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
`;

export const NavbarLinkItem = styled.li`
  font-size: 1.15rem;
  padding: 0.75rem;
`;

export const NavbarLink = styled(Link)`
  color: ${primary};
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
  color: ${primary};
  display: block;

  @media (min-width: 1024px) {
    display: none;
  }
`;
