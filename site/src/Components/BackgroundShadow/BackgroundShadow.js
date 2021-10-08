import React from 'react';
import PropTypes from 'prop-types';

import { Shadow } from './BackgroundShadowElements';

const BackgroundShadow = ({ handleBackgroundClick }) => {
  return <Shadow onClick={handleBackgroundClick} />;
};

BackgroundShadow.propsTypes = {
  handleBackgroundClick: PropTypes.func.isRequired
};

export default BackgroundShadow;
