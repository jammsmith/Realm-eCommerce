import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Components/Navbar.js';
import OrdersTable from './Components/OrdersTable.js';
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

Admin.propTypes = {

};

export default Admin;
