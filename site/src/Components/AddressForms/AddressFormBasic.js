import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import RowGroup from '../Forms/RowGroup.js';
import TextInput from '../Forms/TextInput.js';
import ActionButton from '../ActionButton.js';
import UserMessage from '../UserMessage.js';
import ProgressSpinner from '../ProgressSpinner.js';

// Styled components
import { SpacedRow } from './StyledComponents';

const AddressFormBasic = ({ onAddressValid, address }) => {
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

  useEffect(() => {
    if (address && address !== addressFields) {
      setAddressFields(prev => ({ ...prev, ...address }));
    }
  }, [address]);

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
        await onAddressValid(addressFields);
      }
    } catch (err) {
      throw new Error('Failed to save address. Error:', err);
    } finally {
      setLoading(false);
    }
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
        />
        <TextInput
          name='county'
          value={addressFields.county}
          label='County / State'
          handleChange={handleInputChange}
          variant='outlined'
          margin='normal'
          type='text'
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
        />
        <TextInput
          name='country'
          value={addressFields.country}
          label='Country'
          handleChange={handleInputChange}
          variant='outlined'
          margin='normal'
          type='text'
        />
      </RowGroup>
      <ActionButton
        text={loading ? <ProgressSpinner size='1.5rem' /> : 'save address'}
        onClick={handleSubmit}
        customStyles={{ width: '10rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}
      />
      {message && message.type && <UserMessage type={message.type} text={message.text} />}
    </form>
  );
};

AddressFormBasic.propTypes = {
  onAddressValid: PropTypes.func.isRequired,
  address: PropTypes.object
};

export default AddressFormBasic;
