import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@mui/material';

const SelectInput = ({ name, value, required, helperText, label, handleChange, options }) => {
  return (
    <div>
      <TextField
        id={name}
        name={name}
        value={value}
        select
        aria-describedby={name}
        required={required !== false}
        helperText={helperText}
        label={label}
        variant='filled'
        onChange={handleChange}
        fullWidth
        sx={{
          backgroundColor: 'transparent',
          background: 'transparent',
          borderRadius: '10px'
        }}
        SelectProps={{ name: name, value: value, width: '5rem' }}
      >
        {
          options.map((option, index) => {
            return (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            );
          })
        }
      </TextField>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array
};

export default SelectInput;
