import React, { useState } from 'react';

// Components
import TextInput from '../../../../Components/Forms/TextInput.js';
import SelectInput from '../../../../Components/Forms/SelectInput.js';
import RowGroup from '../../../../Components/Forms/RowGroup.js';
import ActionButton from '../../../../Components/ActionButton.js';

// Styled components
import {
  FormWrapper,
  FormHeader,
  FormAction,
  SelectAddressWrapper,
  PersonalDetailsWrapper,
  Warning
} from './StyledComponents.js';

// Helpers
import { validateAddress, getAddressesFromPostcode } from '../../../../helpers/address.js';

const DeliveryForm = () => {
  // Form state
  const [inputFields, setInputFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    houseNum: '',
    postcode: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [message, setMessage] = useState('');

  // Address state
  const [address, setAddress] = useState();
  const [addressOptions, setAddressOptions] = useState({});

  // event handlers
  const handleInputChange = (e) => {
    setInputFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleValidateAddress = async () => {
    try {
      setFormStatus('validation-requested');
      // Check required fields are filled and run some validation on name/email/phone
      const result = validateAddress(inputFields);
      if (result.isValid === true) {
        setFormStatus('validation-passed');
        // Get the address from postcode lookup API
        const addresses = await getAddressesFromPostcode(inputFields.postcode);
        // Show the customer the suggested addresses, allow them to choose between or input their own
        setAddressOptions(addresses);
        setFormStatus('user-selection-required');
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      throw new Error('Address validation failed. Error', err);
    }
  };

  const handleSelectAddress = (e) => {
    setAddress(e.target.value);
  };

  const header = formStatus === 'user-confirmation-required' || formStatus === 'user-selection-required'
    ? 'Please confirm your delivery details'
    : 'Please enter your delivery details';

  const inputOptions = [
    [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' }
    ],
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Phone', required: false },
    { name: 'houseNum', label: 'House Number/Name' },
    { name: 'postcode', label: 'Postcode' }
  ];

  return (
    formStatus === 'user-selection-required'
      ? <FormWrapper>
        <FormHeader>{header}</FormHeader>
        <PersonalDetailsWrapper>
          <div>
            <p>First Name:</p>
            <p>Last Name:</p>
            <p>Email:</p>
            <p>Phone:</p>
          </div>
          <div>
            <p>{inputFields.firstName}</p>
            <p>{inputFields.lastName}</p>
            <p>{inputFields.email}</p>
            <p>{inputFields.phone || ''}</p>
          </div>
        </PersonalDetailsWrapper>
        <SelectAddressWrapper style={{ marginTop: '5.5rem' }}>
          <SelectInput
            name='addressSelect'
            value={address || ''}
            label='Please select your address'
            required
            helperText='Choose your address from the dropdown menu or choose "input address" to add a different address'
            handleChange={handleSelectAddress}
            options={addressOptions}
          />
        </SelectAddressWrapper>
        </FormWrapper>
      : <FormWrapper>
        <FormHeader>{header}</FormHeader>
        <form>
          {
            inputOptions.map((option, index) => {
              if (Array.isArray(option)) {
                return (
                  <RowGroup key={index}>
                    {option.map((item, index) =>
                      <TextInput
                        key={`${index}-${item.name}`}
                        name={item.name}
                        label={item.label}
                        value={inputFields.name}
                        handleChange={handleInputChange}
                        required={item.required && item.required}
                      />
                    )}
                  </RowGroup>
                );
              } else {
                return (
                  <TextInput
                    key={`${index}-${option.name}`}
                    name={option.name}
                    label={option.label}
                    value={inputFields.name}
                    handleChange={handleInputChange}
                    required={option.required && option.required}
                  />
                );
              }
            })
          }
        </form>
        <div>
          {message && <Warning>{message}</Warning>}
          <ActionButton text='find address' onClick={handleValidateAddress} />
        </div>
        </FormWrapper>
  );
};

export default DeliveryForm;
