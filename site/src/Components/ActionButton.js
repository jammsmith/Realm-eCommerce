// External imports
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// Fonts
import fonts from '../styles/fonts.js';
const { standard } = fonts;

//
const ActionButton = ({ text, linkTo, variant, customStyles, onClick }) => {
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
      <Button onClick={onClick} variant={variant || 'outlined'} style={customStyles || basicStyles}>
        {text}
      </Button>
    </Link>
  );
};

ActionButton.propTypes = {
  text: PropTypes.node.isRequired,
  linkTo: PropTypes.string,
  variant: PropTypes.string,
  customStyles: PropTypes.object,
  onClick: PropTypes.func
};

export default ActionButton;
