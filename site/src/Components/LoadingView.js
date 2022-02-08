import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
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

const LoadingView = ({ timeout, redirectUrl, redirectName, initialMessage }) => {
  const history = useHistory();
  const [waitPhase, setWaitPhase] = useState(0);
  const [message, setMessage] = useState(initialMessage || 'Page Loading');
  const waitTime = timeout || 6000;

  const retryTimer = setInterval(() => setWaitPhase(waitPhase + 1), waitTime);
  const redirectTimer = useRef();

  const handleLoading = useCallback(() => {
    waitPhase === 1 &&
    setMessage('It\'s taking longer than usual, please be patient');

    waitPhase === 2 &&
    setMessage(`Redirecting to ${redirectName}`);
    redirectTimer.current = setTimeout(() => history.push(redirectUrl), 1000);
  }, [waitPhase, redirectName, redirectTimer, redirectUrl, history]);

  const clearTimers = useCallback(() => {
    clearInterval(retryTimer);
    clearTimeout(redirectTimer.current);
  }, [retryTimer, redirectTimer]);

  useEffect(() => {
    handleLoading();
    return () => {
      clearTimers();
    };
  }, [handleLoading, clearTimers]);

  return (
    <Skeleton>
      {message}
      <ProgressSpinner size='4rem' />
    </Skeleton>
  );
};

LoadingView.propTypes = {
  redirectUrl: PropTypes.string.isRequired,
  redirectName: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  initialMessage: PropTypes.string
};

export default LoadingView;
