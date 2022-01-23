import React from 'react';
import styled from 'styled-components';
import ProgressSpinner from './ProgressSpinner.js';

const Skeleton = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingView = () => {
  return (
    <Skeleton>
      <ProgressSpinner size='4rem' />
    </Skeleton>
  );
};

export default LoadingView;
