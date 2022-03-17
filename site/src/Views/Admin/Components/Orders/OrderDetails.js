import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

import DeliverySection from './DeliverySection.js';
import PaymentSection from './PaymentSection.js';
import StatusSection from './StatusSection.js';
import { SINGLE_ORDER_DETAILED } from '../../../../graphql/queries.js';

import { DialogContentWrapper } from '../../styledComponents.js';

const OrderDetails = ({ open, handleClose, orderId }) => {
  const [order, setOrder] = useState();

  const { data, loading } = useQuery(SINGLE_ORDER_DETAILED, {
    variables: { orderId }
  });

  useEffect(() => {
    if (data && data.order) {
      setOrder(data.order);
    }
  }, [data, loading]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='80vw'>
      <DialogTitle>Manage Orders</DialogTitle>
      <DialogContent>
        <DialogContentWrapper>
          {
            order
              ? <>
                <DeliverySection order={order} />
                <PaymentSection order={order} />
                <StatusSection order={order} />
              </>
              : null
          }
        </DialogContentWrapper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

OrderDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  orderId: PropTypes.object.isRequired
};

export default OrderDetails;
