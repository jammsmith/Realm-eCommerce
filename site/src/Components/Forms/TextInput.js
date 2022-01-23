import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const TextInput = ({ name, value, label, helperText, required, handleChange }) => {
  return (
    <TextField
      id={name}
      name={name}
      value={value}
      aria-describedby={name}
      required={required !== false}
      helperText={helperText}
      label={label}
      margin='dense'
      variant='filled'
      onChange={handleChange}
      fullWidth
      sx={{
        backgroundColor: 'transparent',
        background: 'transparent',
        borderRadius: '10px'
      }}
    />
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  required: PropTypes.bool
};

export default TextInput;
