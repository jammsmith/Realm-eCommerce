import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import FormSubmit from './FormSubmit.js';
import RowGroup from '../Forms/RowGroup.js';
import TextInput from '../Forms/TextInput.js';
import { formatUserDetails } from '../../helpers/user.js';

const AddressFormBasic = ({ onAddressValid, onEditting, buttonText, successMessage, disableOnComplete, defaultAddress }) => {
  const [addressFields, setAddressFields] = useState({
    address_id: defaultAddress ? defaultAddress.address_id : '',
    line1: defaultAddress ? defaultAddress.line1 : '',
    line2: defaultAddress ? defaultAddress.line2 : '',
    city: defaultAddress ? defaultAddress.city : '',
    county: defaultAddress ? defaultAddress.county : '',
    postcode: defaultAddress ? defaultAddress.postcode : '',
    country: defaultAddress ? defaultAddress.country : ''
  });
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const handleFormComplete = useCallback(() => {
    setMessage({
      type: 'success',
      text: successMessage || 'Saved address details'
    });
    setFormDisabled(true);
  }, [successMessage]);

  const handleInputChange = (e) => {
    setAddressFields(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      // check required fields exist
      const failedTests = [];
      const requiredFields = ['line1', 'city', 'county', 'postcode', 'country'];
      for (const field of requiredFields) {
        if (!addressFields[field] || addressFields[field] === '') {
          failedTests.push(field);
        }
      }
      if (failedTests.length) {
        setMessage({
          type: 'error',
          text: 'Address must include all fields marked as required (*)'
        });
      } else {
        const { address_id: addressId, ...fieldsToFormat } = addressFields;
        const formattedFields = formatUserDetails(fieldsToFormat);
        onAddressValid({ ...formattedFields, address_id: addressId }, 'delivery');
        if (disableOnComplete) {
          handleFormComplete();
        }
      }
    } catch (err) {
      throw new Error('Failed to save address. Error:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleBackToEdit = () => {
    setFormDisabled(false);
    setMessage({});
    if (onEditting) {
      onEditting('delivery');
    }
  };

  useEffect(() => {
    if (defaultAddress && disableOnComplete) {
      handleFormComplete();
    }
  }, [defaultAddress, disableOnComplete, handleFormComplete]);

  return (
    <form>
      <TextInput
        name='line1'
        value={addressFields.line1}
        label='Address Line 1'
        handleChange={handleInputChange}
        variant='outlined'
        margin='normal'
        type='text'
        disabled={formDisabled}
      />
      <TextInput
        name='line2'
        value={addressFields.line2}
        label='Address Line 2'
        handleChange={handleInputChange}
        required={false}
        variant='outlined'
        margin='normal'
        type='text'
        disabled={formDisabled}
      />
      <RowGroup>
        <TextInput
          name='city'
          value={addressFields.city}
          label='City'
          handleChange={handleInputChange}
          variant='outlined'
          margin='normal'
          type='text'
          disabled={formDisabled}
        />
        <TextInput
          name='county'
          value={addressFields.county}
          label='County / State'
          handleChange={handleInputChange}
          variant='outlined'
          margin='normal'
          type='text'
          disabled={formDisabled}
        />
      </RowGroup>
      <RowGroup>
        <TextInput
          name='postcode'
          value={addressFields.postcode}
          label='Postcode'
          handleChange={handleInputChange}
          variant='outlined'
          margin='normal'
          type='text'
          disabled={formDisabled}
        />
        <TextInput
          name='country'
          value={addressFields.country}
          label='Country'
          handleChange={handleInputChange}
          variant='outlined'
          margin='normal'
          type='text'
          disabled={formDisabled}
        />
      </RowGroup>
      <FormSubmit
        formDisabled={formDisabled}
        message={message}
        buttonText={buttonText}
        loading={loading}
        handleSubmit={handleSubmit}
        handleBackToEdit={handleBackToEdit}
      />
    </form>
  );
};

AddressFormBasic.propTypes = {
  onAddressValid: PropTypes.func.isRequired,
  onEditting: PropTypes.func,
  buttonText: PropTypes.string,
  successMessage: PropTypes.string,
  disableOnComplete: PropTypes.bool,
  defaultAddress: PropTypes.object
};

export default AddressFormBasic;
