import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import AddressFormBasic from '../../../../Components/AddressForms/AddressFormBasic.js';
import PersonalDetailsForm from '../../../../Components/AddressForms/PersonalDetailsForm.js';
import Heading from '../../../../Components/Heading.js';
import { getDefaultAddress } from '../../../../helpers/address.js';

// Styled components
import { CheckoutItem } from './StyledComponents.js';

const DeliveryForm = ({ dbUser, updateDeliveryDetails, updateCheckoutCompletion }) => {
  const handleValidDetails = useCallback((fields, formType) => {
    updateDeliveryDetails(fields);
    if (formType) {
      updateCheckoutCompletion({ [`${formType}FormComplete`]: true });
    }
  }, [updateDeliveryDetails, updateCheckoutCompletion]);

  const handleEditDetails = useCallback((formType) => {
    updateCheckoutCompletion({ [`${formType}FormComplete`]: false });
  }, [updateCheckoutCompletion]);

  const defaultAddress = getDefaultAddress(dbUser.addresses);

  useEffect(() => {
    if (dbUser.type === 'customer' || dbUser.type === 'admin') {
      const { firstName, lastName, email, phone } = dbUser;
      if (defaultAddress) {
        handleValidDetails({ address_id: defaultAddress.address_id, firstName, lastName, email, phone });
        updateCheckoutCompletion({
          personalFormComplete: true,
          deliveryFormComplete: true
        });
      } else {
        handleValidDetails({ firstName, lastName, email, phone });
        updateCheckoutCompletion({
          personalFormComplete: true
        });
      }
    }
  }, [dbUser, defaultAddress, handleValidDetails, updateCheckoutCompletion]);

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
          requiredFields={['firstName', 'lastName', 'email']}
        />
      </CheckoutItem>
      <CheckoutItem>
        <Heading text='Delivery details' size='small' />
        <AddressFormBasic
          onAddressValid={handleValidDetails}
          onEditting={handleEditDetails}
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
  updateCheckoutCompletion: PropTypes.func.isRequired
};

export default DeliveryForm;
