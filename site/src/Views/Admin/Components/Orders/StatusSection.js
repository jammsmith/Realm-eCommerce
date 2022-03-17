import React from 'react';
import PropTypes from 'prop-types';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

import Heading from '../../../../Components/Heading.js';

// Styled components
import {
  DataSection as Section,
  DataRow,
  DataRowLeftItem,
  DataRowRightItem,
  AddressWrapper
} from '../../styledComponents.js';

const StatusSection = ({ order }) => {
  const { delivery } = order;
  const { address } = delivery;
  return (
    <Section>
      <Heading text='Order Status' size='small' />
      <div>
        <DataRow>
          <DataRowLeftItem>Name</DataRowLeftItem>
          <DataRowRightItem>{delivery.firstName} {delivery.lastName}</DataRowRightItem>
        </DataRow>
        <DataRow>
          <DataRowLeftItem>Email</DataRowLeftItem>
          <DataRowRightItem>{delivery.email}</DataRowRightItem>
        </DataRow>
        <DataRow>
          <DataRowLeftItem>Phone</DataRowLeftItem>
          <DataRowRightItem>{delivery.phone}</DataRowRightItem>
        </DataRow>
        <DataRow>
          {
            address
              ? <>
                <DataRowLeftItem>Address</DataRowLeftItem>
                <AddressWrapper>
                  <DataRowRightItem>{address.line1}</DataRowRightItem>
                  <DataRowRightItem>{address.line2}</DataRowRightItem>
                  <DataRowRightItem>{address.city}</DataRowRightItem>
                  <DataRowRightItem>{address.postcode.toUpperCase()}</DataRowRightItem>
                  <DataRowRightItem>{address.country.toUpperCase()}</DataRowRightItem>
                </AddressWrapper>
              </>
              : <>
                <DataRowLeftItem>Store Pick-up</DataRowLeftItem>
                <IoCheckmarkCircleSharp style={{ fontSize: '1.5rem', color: 'green' }} />
              </>
          }
        </DataRow>
      </div>
    </Section>
  );
};

StatusSection.propTypes = {
  order: PropTypes.object.isRequired
};

export default StatusSection;
