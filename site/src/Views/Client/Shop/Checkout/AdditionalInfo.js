import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

// Styled components
import { CheckoutItem } from './StyledComponents.js';

const AdditionalInfo = ({ additionalInfo, updateAdditionalInfo }) => {
  const handleInput = (e) => {
    updateAdditionalInfo(e.target.value);
  };

  return (
    <div>
      <CheckoutItem>
        <TextField
          multiline
          minRows={8}
          maxRows={8}
          label='Additional info'
          helperText='Please add any additional info to do with your order here'
          sx={{ marginTop: '1rem' }}
          onChange={handleInput}
          value={additionalInfo}
        />
      </CheckoutItem>
    </div>
  );
};

AdditionalInfo.propTypes = {
  additionalInfo: PropTypes.string.isRequired,
  updateAdditionalInfo: PropTypes.func.isRequired
};

export default AdditionalInfo;
