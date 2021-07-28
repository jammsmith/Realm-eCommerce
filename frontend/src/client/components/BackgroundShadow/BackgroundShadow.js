import React from 'react';

import { Shadow } from './BackgroundShadowElements';

const BackgroundShadow = props => {
  return <Shadow onClick={props.handleBackgroundClick} />;
};

export default BackgroundShadow;
