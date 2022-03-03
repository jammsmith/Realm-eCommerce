import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FormSubmit from './FormSubmit.js';
import RowGroup from '../Forms/RowGroup.js';
import TextInput from '../Forms/TextInput.js';
import { formatUserDetails } from '../../helpers/user.js';

const AddressFormBasic = ({ dbUser, onAddressValid, buttonText, successMessage, disableOnSuccess }) => {
  const [addressFields, setAddressFields] = useState({
    line1: '',
    line2: '',
    city: '',
    county: '',
    postcode: '',
    country: ''
  });
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    if (dbUser.addresses && dbUser.addresses.length) {
      const defaultAddress = dbUser.addresses.find(addr => addr.isDefault === true);
      if (addressFields !== defaultAddress) {
        setAddressFields(defaultAddress);
      }
    }
  }, [dbUser]);

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
        const formattedFields = formatUserDetails(addressFields);
        await onAddressValid({ ...formattedFields, address_id: addressFields.address_id });
        if (disableOnSuccess) {
          setMessage({
            type: 'success',
            text: successMessage || 'Saved address'
          });
          setFormDisabled(true);
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
  };

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
  dbUser: PropTypes.object.isRequired,
  onAddressValid: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  successMessage: PropTypes.string,
  disableOnSuccess: PropTypes.bool
};

export default AddressFormBasic;
