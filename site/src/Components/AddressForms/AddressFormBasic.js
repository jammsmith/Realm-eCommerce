import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import RowGroup from '../Forms/RowGroup.js';
import TextInput from '../Forms/TextInput.js';
import ActionButton from '../ActionButton.js';
import UserMessage from '../UserMessage.js';
import ProgressSpinner from '../ProgressSpinner.js';

const AddressFormBasic = ({ onSubmitSuccess, address }) => {
  const [addressFields, setAddressFields] = useState({
    line1: '',
    line2: '',
    city: '',
    county: '',
    postcode: '',
    country: ''
  });

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      console.log('address in form', address);
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
        message: 'Address must include all fields marked as required (*)'
      });
    } else {
      console.log('AddressFormBasic -> handleSubmit no failed tests, addressFields:', addressFields);
      await onSubmitSuccess(addressFields);
      console.log('AddressFormBasic -> handleSubmit onSubmitSuccess completed');
    }
    console.log('3');
    setLoading(false);
    console.log('4');
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
      {message && <UserMessage type={message.type} message={message.text} />}
    </form>
  );
};

AddressFormBasic.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  address: PropTypes.object
};

export default AddressFormBasic;
