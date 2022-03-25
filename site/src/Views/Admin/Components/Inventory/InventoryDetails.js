import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions
} from '@mui/material';
import _ from 'lodash';

import Heading from '../../../../Components/Heading.js';
import { DialogContentWrapper, DialogStyle } from '../../styledComponents.js';
import { DialogHeading } from './styledComponents.js';

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
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogStyle>
        <DialogHeading>
          <Heading
            text={inventoryType ? `Manage ${_.startCase(inventoryType)}` : 'Manage Inventory'}
          />
        </DialogHeading>
        <DialogContentWrapper>
          <TableComponent
            rows={tableRows}
            updateRows={setTableRows}
            reset={!open}
            handleItemSelected={setItemToEdit}
          />
          <EditComponent
            item={itemToEdit}
            tableRows={tableRows}
            updateTableRows={setTableRows}
          />
        </DialogContentWrapper>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </DialogStyle>
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
