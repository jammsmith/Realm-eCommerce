import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import FormSubmit from './FormSubmit.js';
import RowGroup from '../Forms/RowGroup.js';
import TextInput from '../Forms/TextInput.js';
import SelectInput from '../Forms/SelectInput.js';
import Checkbox from '../Forms/Checkbox.js';
import { formatUserDetails } from '../../helpers/user.js';

import { CheckboxWrapper } from './StyledComponents.js';

const AddressFormBasic = ({
  onAddressValid,
  onEditting,
  onPickUpInStore,
  buttonText,
  successMessage,
  disableOnComplete,
  defaultAddress,
  isCheckoutForm
}) => {
  const [addressFields, setAddressFields] = useState({
    address_id: defaultAddress ? defaultAddress.address_id : '',
    line1: defaultAddress ? defaultAddress.line1 : '',
    line2: defaultAddress ? defaultAddress.line2 : '',
    city: defaultAddress ? defaultAddress.city : '',
    county: defaultAddress ? defaultAddress.county : '',
    postcode: defaultAddress ? defaultAddress.postcode : '',
    country: defaultAddress ? defaultAddress.country : ''
  });

  const [deliveryCountries, setDeliveryCountries] = useState([]);
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const pickUpInStore = useRef(false);

  const handleFormComplete = useCallback(async (fields) => {
    setMessage({
      type: 'success',
      text: successMessage || 'Saved address details'
    });

    const { address_id: addressId, ...fieldsToFormat } = fields;
    const formattedFields = formatUserDetails(fieldsToFormat);

    await onAddressValid({ ...formattedFields, address_id: addressId }, 'delivery');

    if (disableOnComplete) {
      setFormDisabled(true);
    }
  }, [successMessage, disableOnComplete, onAddressValid]);

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
        handleFormComplete(addressFields);
      }
    } catch (err) {
      throw new Error('Failed to save address. Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStorePickUpChange = () => {
    pickUpInStore.current = !pickUpInStore.current;
    setFormDisabled(pickUpInStore.current);
    onPickUpInStore(pickUpInStore.current);
  };

  const handleBackToEdit = () => {
    setFormDisabled(false);
    setMessage({});
    if (onEditting) {
      onEditting('delivery');
    }
  };

  //
  const url = '/PostalCountries/countries.json';

  const getCountries = useCallback(async () => {
    const response = await window.fetch(url);
    const jsonResponse = await response.json();

    const deliveryCountries = jsonResponse
      .sort((a, b) => {
        if (a.country < b.country) return -1;
        if (a.country > b.country) return 1;
        return 0;
      })
      .map(({ country }) => ({
        name: country,
        value: country
      }));

    setDeliveryCountries(deliveryCountries);
  }, [url]);

  useEffect(() => getCountries(), [getCountries]);

  //
  useEffect(() => {
    if (defaultAddress && disableOnComplete) {
      handleFormComplete(defaultAddress);
    }
  }, [defaultAddress, disableOnComplete, handleFormComplete]);

  return (
    deliveryCountries ? (
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
          <SelectInput
            name='country'
            value={addressFields.country}
            label='Country *'
            handleChange={handleInputChange}
            options={deliveryCountries}
            required
            variant='outlined'
            disabled={formDisabled}
            style={{ marginTop: '8px' }}
          />
        </RowGroup>
        <FormSubmit
          formDisabled={formDisabled}
          buttonDisabled={pickUpInStore.current}
          message={message}
          buttonText={buttonText}
          loading={loading}
          handleSubmit={handleSubmit}
          handleBackToEdit={handleBackToEdit}
          pickUpInStore={pickUpInStore.current}
        />
        {
          isCheckoutForm && (
            <CheckboxWrapper>
              <Checkbox
                label='Pick up in-store'
                handleChange={handleStorePickUpChange}
                value={pickUpInStore.current}
              />
            </CheckboxWrapper>
          )
        }
      </form>
    ) : null
  );
};

AddressFormBasic.propTypes = {
  onAddressValid: PropTypes.func.isRequired,
  onEditting: PropTypes.func,
  onPickUpInStore: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  successMessage: PropTypes.string,
  disableOnComplete: PropTypes.bool,
  defaultAddress: PropTypes.object,
  isCheckoutForm: PropTypes.bool
};

export default AddressFormBasic;
