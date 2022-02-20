import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProgressSpinner from './ProgressSpinner.js';

export const Skeleton = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const LoadingView = ({ message }) => {
  return (
    <Skeleton>
      {message && message}
      <ProgressSpinner size='4rem' />
    </Skeleton>
  );
};

LoadingView.propTypes = {
  message: PropTypes.string
};

export default LoadingView;
