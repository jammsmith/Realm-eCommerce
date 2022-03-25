import React, { useState } from 'react';

import Heading from '../../../../Components/Heading.js';
import BigButton from './BigButton.js';
import InventoryDetails from './InventoryDetails.js';
import ProductTable from './Products/ProductTable.js';
import ProductEdit from './Products/ProductEdit.js';

// Styled components
import { InventoryWrapper, InventoryButtonWrapper } from '../../styledComponents.js';

const Inventory = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handleSelection = (type) => {
    setSelectedType(type);
    setDialogOpen(true);
  };

  return (
    <InventoryWrapper>
      <Heading text='Inventory' size='small' color='white' />
      <InventoryDetails
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        inventoryType={selectedType}
        tableSection={ProductTable}
        editSection={ProductEdit}
      />
      <InventoryButtonWrapper>
        <BigButton
          type='products'
          handleSelection={() => handleSelection('products')}
        />
        <BigButton
          type='subcategories'
          handleSelection={() => handleSelection('subcategories')}
        />
        <BigButton
          type='categories'
          handleSelection={() => handleSelection('categories')}
        />
      </InventoryButtonWrapper>
    </InventoryWrapper>
  );
};

export default Inventory;
