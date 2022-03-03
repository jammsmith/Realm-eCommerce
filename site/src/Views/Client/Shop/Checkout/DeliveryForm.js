import React from 'react';
import PropTypes from 'prop-types';

import AddressFormWithLookup from '../../../../Components/AddressForms/AddressFormWithLookup.js';
import AddressFormBasic from '../../../../Components/AddressForms/AddressFormBasic.js';

const DeliveryForm = ({ formType, ...other }) => {
  return (
    <>
      {
        formType === 'basic' &&
          <AddressFormBasic {...other} />
      }
      {
        formType === 'lookup' &&
          <AddressFormWithLookup {...other} />
      }
    </>
  );
};

DeliveryForm.propTypes = {
  formType: PropTypes.string.isRequired,
  deliveryDetails: PropTypes.object.isRequired,
  updateDeliveryDetails: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default DeliveryForm;
