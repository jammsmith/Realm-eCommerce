import React from 'react';
import PropTypes from 'prop-types';

// Styled components
import { InventoryWrapper } from '../styledComponents.js';

const InventoryTable = ({ openDialog }) => {
  return (
    <InventoryWrapper>Inventory Table</InventoryWrapper>
  );
};

InventoryTable.propTypes = {
  openDialog: PropTypes.func.isRequired
};

export default InventoryTable;
