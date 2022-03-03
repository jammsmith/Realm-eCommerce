import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import RowGroup from '../../../Components/Forms/RowGroup.js';
import TextInput from '../../../Components/Forms/TextInput.js';
import ActionButton from '../../../Components/ActionButton.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';
import { validateInputFields } from '../../../helpers/address.js';
import UserMessage from '../../../Components/UserMessage.js';
import ProgressSpinner from '../../../Components/ProgressSpinner.js';

// Styled components
import { Wrapper } from './StyledComponents.js';

const PersonalDetails = ({ dbUser }) => {
  const [personalDetailsFields, setPersonalDetailsFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const [updateUser] = useDDMutation(mutations.UpdateUser);

  useEffect(() => {
    setPersonalDetailsFields({
      firstName: dbUser.firstName || '',
      lastName: dbUser.lastName || '',
      email: dbUser.email || '',
      phone: dbUser.phone || ''
    });
  }, [dbUser, setPersonalDetailsFields]);

  const handleInputChange = (e) => {
    setPersonalDetailsFields(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requiredFields = ['email'];
    const { isValid, message } = validateInputFields(personalDetailsFields, requiredFields);

    if (isValid) {
      try {
        const formattedFields = {};
        for (const key in personalDetailsFields) {
          const value = personalDetailsFields[key];
          switch (key) {
            case 'firstName':
            case 'lastName':
              formattedFields[key] = _.startCase(value.trim());
              break;
            case 'email':
              formattedFields.email = value.trim().toLowerCase();
              break;
            default: formattedFields[key] = value.trim();
              break;
          }
        }
        await updateUser({
          variables: {
            id: dbUser._id,
            ...formattedFields
          }
        });
        setPersonalDetailsFields(formattedFields);

        setMessage({ type: 'success', text: 'Details saved' });
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to save details, please refresh and try again or contact Doves and Dandys if the problem persists' });
      }
    } else {
      setMessage({ type: 'error', text: message });
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <form>
        <RowGroup>
          <TextInput
            name='firstName'
            value={personalDetailsFields.firstName}
            label='First name'
            handleChange={handleInputChange}
            required={false}
            variant='outlined'
            margin='normal'
            type='text'
          />
          <TextInput
            name='lastName'
            value={personalDetailsFields.lastName}
            label='Last name'
            handleChange={handleInputChange}
            required={false}
            variant='outlined'
            margin='normal'
            type='text'
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
        />
        <TextInput
          name='phone'
          value={personalDetailsFields.phone}
          label='Phone'
          handleChange={handleInputChange}
          required={false}
          variant='outlined'
          margin='normal'
          type='text'
        />
        <ActionButton
          text={loading ? <ProgressSpinner size='1.5rem' /> : 'save details'}
          onClick={handleSubmit}
          customStyles={{ width: '8rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}
        />
        {message && <UserMessage type={message.type} message={message.text} />}
      </form>
    </Wrapper>
  );
};

export default PersonalDetails;
