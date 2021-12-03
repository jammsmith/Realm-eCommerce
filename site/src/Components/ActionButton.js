// External imports
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// Fonts
import fonts from '../styles/fonts.js';
const { standard } = fonts;

//
const ActionButton = ({ text, linkTo, variant, customStyles, onClick, name, value, disabled }) => {
  const basicStyles = {
    fontFamily: standard
  };

  if (customStyles) {
    customStyles = {
      ...basicStyles,
      ...customStyles
    };
  }

  return (
    <Link to={linkTo}>
      <Button
        onClick={onClick}
        name={name}
        value={value}
        variant={variant || 'outlined'}
        style={customStyles || basicStyles}
        disabled={disabled || false}
      >
        {text}
      </Button>
    </Link>
  );
};

ActionButton.propTypes = {
  text: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  linkTo: PropTypes.string,
  variant: PropTypes.string,
  customStyles: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default ActionButton;
