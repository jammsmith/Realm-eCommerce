import React, { useState, cloneElement } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navbar from './Navbar/Navbar';
import SideDrawer from './SideDrawer/SideDrawer';
import BackgroundShadow from './BackgroundShadow/BackgroundShadow';
import Footer from './Footer/Footer.js';
import FreeDelivery from './Offers/FreeDelivery.js';
import SectionSpacer from './SectionSpacer.js';

const ClientStyles = styled.section`
  min-height: 100vh;
  background-color: rgba(230,231,203,1);
  display: flex;
  flex-direction: column;
`;
const ScrollDisabled = styled(ClientStyles)`
  height: 100vh;
  overflow-y: hidden;
`;
const Spacer = styled.div`
  flex: 1
`;

const ClientView = ({ children }) => {
  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const handleToggle = () => setMenuInView(prevValue => !prevValue);

  const closeMenu = () => {
    setMenuInView(false);
  };

  const { state } = useLocation();

  const content =
    <>
      <FreeDelivery />
      <Navbar handleToggle={handleToggle} />
      <SectionSpacer dark spaceBelow />
      {
        menuInView &&
          <>
            <SideDrawer handleDrawerLinkClick={closeMenu} />
            <BackgroundShadow handleBackgroundClick={closeMenu} />
          </>
      }
      {state && Object.keys(state).length ? cloneElement(children, { ...state }) : children}
      <Spacer />
      <Footer />
    </>;

  return (
    menuInView
      ? <ScrollDisabled>{content}</ScrollDisabled>
      : <ClientStyles>{content}</ClientStyles>
  );
};

ClientView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.object
  ]).isRequired
};

export default ClientView;
