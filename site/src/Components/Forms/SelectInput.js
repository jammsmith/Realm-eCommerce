import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const optionStyles = {
  width: '10rem',
  display: 'block',
  padding: '0.25rem'
};

const SelectInput = ({ name, value, required, helperText, label, handleChange, options }) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          id={name}
          name={name}
          value={value}
          aria-describedby={name}
          required={required !== false}
          helperText={helperText}
          variant='filled'
          onChange={handleChange}
          sx={{
            backgroundColor: 'transparent',
            background: 'transparent',
            borderRadius: '10px'
          }}
        >
          {
            options.map((option, index) => {
              return (
                <MenuItem style={optionStyles} key={index} value={option}>
                  {option}
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
  helperText: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array
};

export default SelectInput;
