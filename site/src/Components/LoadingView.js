import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProgressSpinner from './ProgressSpinner.js';

const Skeleton = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const LoadingView = ({ timeout, redirectTo, initialMessage }) => {
  const history = useHistory();
  const [waitPhase, setWaitPhase] = useState(0);
  const [message, setMessage] = useState(initialMessage || 'Page Loading');
  const waitTime = timeout || 6000;

  const retry = useCallback(() => {
    setTimeout(() => setWaitPhase(waitPhase + 1), waitTime);
  }, [waitPhase, waitTime]);

  const redirect = useCallback(() => {
    setTimeout(() => history.push(`/${redirectTo}`), 1000);
  }, [redirectTo, history]);

  useEffect(() => {
    switch (waitPhase) {
      case 1:
        setMessage('It\'s taking longer than usual, please be patient');
        retry();
        break;
      case 2:
        setMessage(`Redirecting back to ${redirectTo}`);
        redirect();
        break;
      default: retry();
    }

    // Cancel timeouts
    return () => {
      clearTimeout(retry);
      clearTimeout(redirect);
    };
  }, [waitPhase, redirectTo, retry, redirect]);

  return (
    <Skeleton>
      {message}
      <ProgressSpinner size='4rem' />
    </Skeleton>
  );
};

LoadingView.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  initialMessage: PropTypes.string
};

export default LoadingView;
