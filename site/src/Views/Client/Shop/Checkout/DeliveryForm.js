import React, { useState } from 'react';
import _ from 'lodash';

// Components
import TextInput from '../../../../Components/Forms/TextInput.js';
import SelectInput from '../../../../Components/Forms/SelectInput.js';
import RowGroup from '../../../../Components/Forms/RowGroup.js';
import Checkbox from '../../../../Components/Forms/Checkbox.js';
import ActionButton from '../../../../Components/ActionButton.js';

// Styled components
import {
  FormWrapper,
  FormHeader,
  SelectAddressWrapper,
  PersonalDetailsWrapper,
  Warning,
  CheckboxWrapper
} from './StyledComponents.js';

// Helpers
import { validateInputFields, getAddressesFromPostcode } from '../../../../helpers/address.js';

const DeliveryForm = ({ selectedAddressState }) => {
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
  const [pickUpInStore, setPickUpInStore] = useState(false);

  // Address state
  const [selectedAddress, setSelectedAddress] = selectedAddressState;
  const [addressOptions, setAddressOptions] = useState({});

  // Event handlers
  const handleInputChange = (e) => {
    setInputFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleValidateInputFields = async () => {
    try {
      setFormStatus('validation-requested');

      // Check required fields are filled and run some validation on name/email/phone
      let requiredFields = ['firstName', 'lastName', 'email'];
      if (!pickUpInStore) {
        requiredFields = [...requiredFields, 'postcode', 'houseNum'];
      }
      const result = validateInputFields(inputFields, requiredFields);

      if (result.isValid === true) {
        setFormStatus('validation-passed');

        // End function here if picking up in-store
        if (pickUpInStore) return;

        // Otherwise, get the address from postcode lookup API
        const addresses = await getAddressesFromPostcode(inputFields.postcode);

        // Show the customer the suggested addresses and allow to select theirs from a dropdown
        setAddressOptions(addresses);
        setFormStatus('user-selection-required');
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      throw new Error('Address validation failed. Error', err);
    }
  };

  // Set relevant header
  const header = formStatus === 'user-confirmation-required' || formStatus === 'user-selection-required'
    ? 'Please confirm your delivery details'
    : 'Please enter your delivery details';

  // Set relevant input fields
  const personalDetails = [
    [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' }
    ],
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Phone', required: false }
  ];
  const addressDetails = [
    { name: 'houseNum', label: 'House Number/Name' },
    { name: 'postcode', label: 'Postcode' }
  ];
  const inputOptions = pickUpInStore ? personalDetails : [...personalDetails, ...addressDetails];

  return (
    <FormWrapper>
      {
        (formStatus === 'validation-passed' && pickUpInStore) || formStatus === 'user-selection-required'
          ? <>
            <FormHeader>{header}</FormHeader>
            <PersonalDetailsWrapper>
              <div>
                <p>First Name:</p>
                <p>Last Name:</p>
                <p>Email:</p>
                <p>Phone:</p>
              </div>
              <div>
                <p>{_.startCase(inputFields.firstName)}</p>
                <p>{_.startCase(inputFields.lastName)}</p>
                <p>{inputFields.email.toLowerCase()}</p>
                <p>{inputFields.phone || ''}</p>
              </div>
            </PersonalDetailsWrapper>
            {
              formStatus === 'user-selection-required' &&
                <SelectAddressWrapper style={{ marginTop: '5.5rem' }}>
                  <SelectInput
                    name='addressSelect'
                    value={selectedAddress || ''}
                    label='Please select your address'
                    required
                    helperText='Choose your address from the dropdown menu or choose "Pick up In-Store"'
                    handleChange={e => setSelectedAddress(e.target.value)}
                    options={addressOptions}
                  />
                </SelectAddressWrapper>
            }
            <div>
              <ActionButton
                text='back'
                onClick={() => {
                  setPickUpInStore(false);
                  setFormStatus('');
                }}
                customStyles={{ marginTop: '1rem' }}
              />
            </div>
          </>
          : <>
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
              <ActionButton
                text={pickUpInStore ? 'confirm' : 'find address'}
                customStyles={{ marginTop: '0.5rem' }}
                onClick={handleValidateInputFields}
              />
            </div>
            <CheckboxWrapper>
              <Checkbox
                label='Pick up in-store'
                handleChange={() => setPickUpInStore(prev => !prev)}
                value={pickUpInStore}
              />
            </CheckboxWrapper>
          </>
      }
    </FormWrapper>
  );
};

export default DeliveryForm;
