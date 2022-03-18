import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import _ from 'lodash';

import Heading from '../../../../Components/Heading.js';
import { DialogContentWrapper } from '../../styledComponents.js';

const InventoryDetails = ({ tableSection, editSection, inventoryType, open, handleClose }) => {
  const [tableRows, setTableRows] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({});

  const TableComponent = tableSection;
  const EditComponent = editSection;

  useEffect(() => {
    if (!open && itemToEdit) {
      setItemToEdit({});
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='80vw'>
      <Heading text={inventoryType ? `Manage ${_.startCase(inventoryType)}` : 'Manage Inventory'} />
      <DialogContentWrapper>
        <TableComponent
          rows={tableRows}
          updateRows={setTableRows}
          reset={!open}
          handleItemSelected={setItemToEdit}
        />
        <EditComponent item={itemToEdit} />
      </DialogContentWrapper>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

InventoryDetails.propTypes = {
  tableSection: PropTypes.elementType.isRequired,
  editSection: PropTypes.elementType.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default InventoryDetails;
