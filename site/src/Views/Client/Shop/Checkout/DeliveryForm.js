import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import AddressFormBasic from '../../../../Components/AddressForms/AddressFormBasic.js';
import PersonalDetailsForm from '../../../../Components/AddressForms/PersonalDetailsForm.js';
import Heading from '../../../../Components/Headings/Heading.js';
import { getDefaultAddress } from '../../../../helpers/address.js';

// Styled components
import { CheckoutItem } from './StyledComponents.js';

const DeliveryForm = ({ dbUser, updateDeliveryDetails, updateCheckoutCompletion, willCustomerPickUpInStore }) => {
  const personalRequiredFields = ['firstName', 'lastName', 'email'];

  const handleValidDetails = useCallback((fields, formType) => {
    updateDeliveryDetails(fields);
    if (formType) {
      updateCheckoutCompletion({ [`${formType}FormComplete`]: true });
    }
  }, [updateDeliveryDetails, updateCheckoutCompletion]);

  const handleEditDetails = useCallback((formType) => {
    updateCheckoutCompletion({ [`${formType}FormComplete`]: false });
  }, [updateCheckoutCompletion]);

  const handlePickUpInStore = (willPickUp) => {
    willCustomerPickUpInStore.current = willPickUp;
    updateCheckoutCompletion({ deliveryFormComplete: !!willPickUp });
  };

  const defaultAddress = getDefaultAddress(dbUser.addresses);

  return (
    <div>
      <CheckoutItem>
        <Heading text='Your details' size='small' />
        <PersonalDetailsForm
          dbUser={dbUser}
          onValidDetails={handleValidDetails}
          onEditting={handleEditDetails}
          buttonText='confirm details'
          successMessage='Personal details confirmed'
          disableOnComplete
          requiredFields={personalRequiredFields}
        />
      </CheckoutItem>
      <CheckoutItem>
        <Heading text='Delivery details' size='small' />
        <AddressFormBasic
          onAddressValid={handleValidDetails}
          onEditting={handleEditDetails}
          onPickUpInStore={handlePickUpInStore}
          buttonText='confirm address'
          successMessage='Address confirmed'
          disableOnComplete
          defaultAddress={defaultAddress}
        />
      </CheckoutItem>
    </div>
  );
};

DeliveryForm.propTypes = {
  dbUser: PropTypes.object.isRequired,
  updateDeliveryDetails: PropTypes.func.isRequired,
  updateCheckoutCompletion: PropTypes.func.isRequired,
  willCustomerPickUpInStore: PropTypes.object.isRequired
};

export default DeliveryForm;
