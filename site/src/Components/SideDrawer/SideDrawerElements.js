import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colours from '../../styles/colours.js';

const { light, dark } = colours;

export const DrawerNav = styled.nav`
  background: ${light};
  box-shadow: 2px 0px 7px rgba(0, 0, 0, 0.6);
  display: fixed;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 80%;
  max-width: 350px;
  z-index: 100;
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const DrawerItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  list-style: none;
  padding: 0 1rem;
  margin: 0;
`;

export const LinkContainer = styled.li`
  padding: 0.25rem 0;
  @media (min-width: 1024px) {
    padding: 0.5rem 0;
  }
`;

export const DrawerLink = styled(Link)`
  color: ${dark};
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: none;
  :hover {
    color: ${dark};
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 5px solid grey;
`;

export const Spacer = styled.div`
  flex: 1;
`;
