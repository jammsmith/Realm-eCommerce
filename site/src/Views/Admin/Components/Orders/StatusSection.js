import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Heading from '../../../../Components/Heading.js';
import ActionButton from '../../../../Components/ActionButton.js';
import ProgressSpinner from '../../../../Components/ProgressSpinner.js';
import UserMessage from '../../../../Components/UserMessage.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';
import mutations from '../../../../graphql/mutations.js';

// Styled components
import {
  DataSection as Section,
  OrderStatusRow,
  DataRowLeftItem,
  DataRowRightItem,
  StatusButtons,
  OrderStatusContainer
} from '../../styledComponents.js';

const StatusSection = ({ order }) => {
  const [loading, setLoading] = useState({});
  const [error, setError] = useState('');
  const [status, setStatus] = useState(order ? order.orderStatus : null);
  useEffect(() => {
    if (order && order.orderStatus !== status) {
      setStatus(order.orderStatus);
    }
  }, [order]);

  const [updateOrder] = useDDMutation(mutations.UpdateOrder);
  const updateOrderStatus = async (e, status) => {
    try {
      e.preventDefault();
      setLoading({ button: status, state: true });
      await updateOrder({
        variables: {
          id: order._id,
          orderStatus: status
        }
      });
      setStatus(status);
      setLoading({ button: status, state: false });
    } catch (err) {
      setError(err);
    } finally {
      loading.state === true && setLoading({});
    }
  };

  return (
    status
      ? <Section>
        <Heading text='Order Status' size='small' />
        <OrderStatusContainer>
          <OrderStatusRow>
            <DataRowLeftItem>Current Status</DataRowLeftItem>
            <DataRowRightItem>{_.startCase(status)}</DataRowRightItem>
          </OrderStatusRow>
          <StatusButtons>
            <ActionButton
              text={loading.status === true && loading.button === 'accepted'
                ? <ProgressSpinner size='1.5rem' />
                : 'Accept Order'}
              onClick={(e) => updateOrderStatus(e, 'accepted')}
              fullWidth
              disabled={status === 'accepted' || status === 'dispatched' || status === 'archived'}
            />
            <ActionButton
              text={loading.status === true && loading.button === 'dispatched'
                ? <ProgressSpinner size='1.5rem' />
                : 'Mark as dispatched'}
              onClick={(e) => updateOrderStatus(e, 'dispatched')}
              fullWidth
              disabled={status === 'dispatched' || status === 'archived'}
            />
            <ActionButton
              text={loading.status === true && loading.button === 'archived'
                ? <ProgressSpinner size='1.5rem' />
                : 'Archive Order'}
              onClick={(e) => updateOrderStatus(e, 'archived')}
              fullWidth
              disabled={status === 'archived'}
            />
          </StatusButtons>
        </OrderStatusContainer>
        </Section>
      : null
  );
};

StatusSection.propTypes = {
  order: PropTypes.object.isRequired
};

export default StatusSection;
