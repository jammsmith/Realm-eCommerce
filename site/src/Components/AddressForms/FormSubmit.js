import React from 'react';
import PropTypes from 'prop-types';

import ActionButton from '../ActionButton.js';
import RowGroup from '../Forms/RowGroup.js';
import ProgressSpinner from '../ProgressSpinner.js';
import UserMessage from '../UserMessage.js';

// Styled components
import { MessageWrapper } from './StyledComponents.js';

const FormSubmit = ({
  formDisabled,
  buttonDisabled,
  message,
  buttonText,
  loading,
  handleSubmit,
  handleBackToEdit,
  pickUpInStore
}) => {
  const buttonProps = {};
  if (!formDisabled || pickUpInStore) {
    buttonProps.onClick = handleSubmit;
    buttonProps.text = loading ? <ProgressSpinner size='1.5rem' /> : buttonText || 'save details';
  } else {
    buttonProps.onClick = handleBackToEdit;
    buttonProps.text = 'Edit details';
  }

  return (
    <RowGroup>
      <ActionButton {...buttonProps} customStyles={{ width: '50%', height: '2.5rem' }} disabled={buttonDisabled} />
      {
        message && message.type &&
          <MessageWrapper>
            <UserMessage type={message.type} text={message.text} />
          </MessageWrapper>
      }
    </RowGroup>
  );
};

FormSubmit.propTypes = {
  formDisabled: PropTypes.bool.isRequired,
  buttonDisabled: PropTypes.bool,
  message: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBackToEdit: PropTypes.func.isRequired
};

export default FormSubmit;
