import React from 'react';
import PropTypes from 'prop-types';

import AddressFormBasic from '../../../../Components/AddressForms/AddressFormBasic.js';
import PersonalDetailsForm from '../../../../Components/AddressForms/PersonalDetailsForm.js';
import Heading from '../../../../Components/Heading.js';

// Styled components
import { CheckoutItem } from './StyledComponents.js';

const DeliveryForm = ({ formType, dbUser, updateDeliveryDetails }) => {
  const handleValidPersonalDetails = (fields) => {
    updateDeliveryDetails(fields);
  };
  const handleValidAddressDetails = async (fields) => {
    updateDeliveryDetails(fields);
  };

  return (
    <>
      {
        formType === 'basic' &&
          <>
            <CheckoutItem>
              <Heading text='Your details' size='small' />
              <PersonalDetailsForm
                dbUser={dbUser}
                onValidDetails={handleValidPersonalDetails}
                buttonText='confirm details'
                successMessage='Personal details confirmed'
                disableOnSuccess
              />
            </CheckoutItem>
            <CheckoutItem>
              <Heading text='Delivery details' size='small' />
              <AddressFormBasic
                dbUser={dbUser}
                onAddressValid={handleValidAddressDetails}
                buttonText='confirm address'
                successMessage='Address confirmed'
                disableOnSuccess
              />
            </CheckoutItem>
          </>
      }
      {/*
        Not using this anymore right now.  Could add back in but would need to refactor a bit to pass
        out a full address and handled as above

        formType === 'lookup' &&
          <AddressFormWithLookup
            deliveryDetails={deliveryDetails}
            updateDeliveryDetails={updateDeliveryDetails}
          />
      */}
    </>
  );
};

DeliveryForm.propTypes = {
  formType: PropTypes.string.isRequired,
  dbUser: PropTypes.object.isRequired,
  deliveryDetails: PropTypes.object.isRequired,
  updateDeliveryDetails: PropTypes.func.isRequired
};

export default DeliveryForm;
