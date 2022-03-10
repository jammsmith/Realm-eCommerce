import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Navbar from './Navbar/Navbar';
import SideDrawer from './SideDrawer/SideDrawer';
import BackgroundShadow from './BackgroundShadow/BackgroundShadow';
import Footer from './Footer/Footer.js';

const ClientStyles = styled.section`
  background-color: rgba(230,231,203,1);
`;

const ClientView = ({ children }) => {
  // Small screen menu toggle -->
  const [menuInView, setMenuInView] = useState(false);
  const handleToggle = () => setMenuInView(prevValue => !prevValue);
  const closeMenu = () => setMenuInView(false);

  return (
    <ClientStyles>
      <Navbar handleToggle={handleToggle} />
      {
        menuInView &&
          <>
            <SideDrawer
              show={menuInView}
              handleDrawerLinkClick={closeMenu}
            />
            <BackgroundShadow handleBackgroundClick={closeMenu} />
          </>
      }
      {children}
      <Footer />
    </ClientStyles>
  );
};

ClientView.propTypes = {
  children: PropTypes.elementType.isRequired
};

export default ClientView;
