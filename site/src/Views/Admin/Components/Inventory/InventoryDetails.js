import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

import { DialogContentWrapper } from '../../styledComponents.js';

const InventoryDetails = ({ children, open, handleClose }) => (
  <Dialog open={open} onClose={handleClose} fullWidth maxWidth='80vw'>
    <DialogTitle>Manage Inventory</DialogTitle>
    <DialogContent>
      <DialogContentWrapper>
        {children}
      </DialogContentWrapper>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

InventoryDetails.propTypes = {
  children: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default InventoryDetails;
