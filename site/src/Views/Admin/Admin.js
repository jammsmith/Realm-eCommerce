import React from 'react';

import Navbar from './Components/Navbar.js';
import OrdersTable from './Components/Orders/Orders.js';
import InventoryTable from './Components/InventoryTable.js';
import SalesGraph from './Components/SalesGraph.js';
import SiteStatsGraph from './Components/SiteStatsGraph.js';

// Styled components
import { AdminWrapper } from './styledComponents.js';

const Admin = () => {
  return (
    <>
      <Navbar />
      <AdminWrapper>
        <OrdersTable />
        <InventoryTable />
        <SalesGraph />
        <SiteStatsGraph />
      </AdminWrapper>
    </>
  );
};

export default Admin;
