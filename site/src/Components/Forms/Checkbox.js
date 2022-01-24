import React from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

// Colours
import colours from '../../styles/colours.js';
const { dark } = colours;

const Checkbox = ({ value, label, handleChange, size }) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          size={size}
          onChange={handleChange}
          sx={{
            color: dark,
            '&.Mui-checked': {
              color: dark
            }
          }}
          value={value}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
