import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import _ from 'lodash';

import DialogHeading from '../DialogHeading.js';

import { DialogContentWrapper } from '../../styledComponents.js';

const InventoryDetails = ({ tableSection, editSection, inventoryType, open, handleClose }) => {
  const [tableRows, setTableRows] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({});

  const TableComponent = tableSection;
  const EditComponent = editSection;

  const handleResetItem = () => {
    setItemToEdit({});
  };

  useEffect(() => {
    if (!open && Object.keys(itemToEdit).length) {
      setItemToEdit({});
    }
  }, [open, itemToEdit]);

  return (
    <Dialog
      open={open}
      fullScreen
      sx={{
        '.MuiDialog-paper': {
          backgroundColor: 'rgba(63, 81, 181, 1)'
        }
      }}
    >
      <DialogHeading
        heading={inventoryType ? `Manage ${_.startCase(inventoryType)}` : 'Manage Inventory'}
        closeDialog={handleClose}
      />
      <DialogContentWrapper>
        <TableComponent
          rows={tableRows}
          updateRows={setTableRows}
          selectedRow={itemToEdit}
          reset={!open}
          handleItemSelected={setItemToEdit}
        />
        <EditComponent
          item={itemToEdit}
          resetItem={handleResetItem}
          tableRows={tableRows}
          updateTableRows={setTableRows}
        />
      </DialogContentWrapper>
    </Dialog>
  );
};

InventoryDetails.propTypes = {
  tableSection: PropTypes.elementType.isRequired,
  editSection: PropTypes.elementType.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  inventoryType: PropTypes.string
};

export default InventoryDetails;
