import React from 'react';

import Navbar from './Components/Navbar.js';
import Orders from './Components/Orders/Orders.js';
import Inventory from './Components/Inventory/Inventory.js';
import SalesGraph from './Components/SalesGraph.js';
import SiteStatsGraph from './Components/SiteStatsGraph.js';

// Styled components
import { AdminWrapper } from './styledComponents.js';

const Admin = () => {
  return (
    <>
      <Navbar />
      <AdminWrapper>
        <Orders />
        <Inventory />
        <SalesGraph />
        <SiteStatsGraph />
      </AdminWrapper>
    </>
  );
};

export default Admin;
