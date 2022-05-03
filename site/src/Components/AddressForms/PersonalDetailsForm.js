import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import FormSubmit from './FormSubmit.js';
import RowGroup from '../Forms/RowGroup.js';
import TextInput from '../Forms/TextInput.js';
import { formatUserDetails } from '../../helpers/user.js';
import { validateInputFields } from '../../helpers/address.js';

const PersonalDetailsForm = ({
  dbUser,
  onValidDetails,
  onEditting,
  buttonText,
  successMessage,
  disableOnComplete,
  requiredFields,
  isCheckoutForm
}) => {
  const [personalDetailsFields, setPersonalDetailsFields] = useState({
    firstName: dbUser.firstName || '',
    lastName: dbUser.lastName || '',
    email: dbUser.email || '',
    phone: dbUser.phone || ''
  });
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const handleFormComplete = useCallback(async (fields) => {
    setMessage({
      type: 'success',
      text: successMessage || 'Saved address details'
    });
    const formattedFields = formatUserDetails(fields);
    await onValidDetails(formattedFields, 'personal');

    if (disableOnComplete) {
      setFormDisabled(true);
    }
  }, [successMessage, disableOnComplete, onValidDetails]);

  const handleInputChange = (e) => {
    setPersonalDetailsFields(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { isValid, message } = validateInputFields(personalDetailsFields, requiredFields);

    if (isValid) {
      try {
        await handleFormComplete(personalDetailsFields);
      } catch (err) {
        console.error('Save personal details failed. Error:', err);
        setMessage({
          type: 'error',
          text: 'Failed to save details, please refresh and try again or contact Doves and Dandys if the problem persists'
        });
      } finally {
        setLoading(false);
      }
    } else {
      setMessage({ type: 'error', text: message });
      setLoading(false);
    }
  };
  const handleBackToEdit = () => {
    setFormDisabled(false);
    setMessage({});
    if (onEditting) {
      onEditting('personal');
    }
  };

  // Check initial values, if all required fields are filled then mark form as complete
  const initialValuesChecked = useRef(false);
  useEffect(() => {
    if (initialValuesChecked.current === false && isCheckoutForm) {
      const { isValid } = validateInputFields(personalDetailsFields, requiredFields);
      if (isValid) {
        handleFormComplete(personalDetailsFields);
      }
      initialValuesChecked.current = true;
    }
  }, [dbUser, disableOnComplete, handleFormComplete, personalDetailsFields, requiredFields, initialValuesChecked, isCheckoutForm]);

  return (
    <form>
      <RowGroup>
        <TextInput
          name='firstName'
          value={personalDetailsFields.firstName}
          label='First name'
          handleChange={handleInputChange}
          required={requiredFields.includes('firstName')}
          variant='outlined'
          margin='normal'
          type='text'
          disabled={formDisabled}
        />
        <TextInput
          name='lastName'
          value={personalDetailsFields.lastName}
          label='Last name'
          handleChange={handleInputChange}
          required={requiredFields.includes('lastName')}
          variant='outlined'
          margin='normal'
          type='text'
          disabled={formDisabled}
        />
      </RowGroup>
      <TextInput
        name='email'
        value={personalDetailsFields.email}
        label='Email'
        handleChange={handleInputChange}
        variant='outlined'
        margin='normal'
        type='email'
        disabled={formDisabled}
        required={requiredFields.includes('email')}
      />
      <TextInput
        name='phone'
        value={personalDetailsFields.phone}
        label='Phone'
        handleChange={handleInputChange}
        variant='outlined'
        margin='normal'
        type='text'
        disabled={formDisabled}
        required={requiredFields.includes('phone')}
      />
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

PersonalDetailsForm.defaultProps = {
  requiredFields: ['email']
};

PersonalDetailsForm.propTypes = {
  dbUser: PropTypes.object.isRequired,
  onValidDetails: PropTypes.func.isRequired,
  requiredFields: PropTypes.array.isRequired,
  onEditting: PropTypes.func,
  buttonText: PropTypes.string,
  successMessage: PropTypes.string,
  disableOnComplete: PropTypes.bool,
  isCheckoutForm: PropTypes.bool
};

export default PersonalDetailsForm;
