import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectInput = ({ name, value, required, label, handleChange, options, variant }) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          id={name}
          name={name}
          value={value}
          label={label}
          aria-describedby={name}
          required={required !== false}
          variant={variant || 'filled'}
          onChange={handleChange}
          sx={{
            backgroundColor: 'transparent',
            background: 'transparent',
            borderRadius: '4px'
          }}
          MenuProps={{
            sx: {
              '.MuiMenu-list': {
                padding: '0.5rem'
              },
              '.MuiMenuItem-root': {
                fontSize: '1.25rem',
                width: '100%'
              },
              '.MuiButtonBase-root': {
                justifyContent: 'flex-start'
              },
              '.MuiMenu-paper': {
                width: '100px'
              }
            }
          }}
        >
          {
            options.map((option, index) => {
              return (
                <MenuItem key={index} value={option.value}>
                  {option.name}
                </MenuItem>
              );
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
  variant: PropTypes.string,
  isAdminSelect: PropTypes.bool
};

export default SelectInput;
