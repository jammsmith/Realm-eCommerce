import React, { useState, useEffect } from 'react';
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

const LoadingView = ({ timeout, redirect, initialMessage }) => {
  const history = useHistory();
  const [waitPhase, setWaitPhase] = useState(0);
  const [message, setMessage] = useState(initialMessage || 'Page Loading');
  const waitTime = timeout || 6000;

  useEffect(() => {
    const retry = () => {
      setTimeout(() => setWaitPhase(waitPhase + 1), waitTime);
    };
    switch (waitPhase) {
      case 1:
        setMessage('It\'s taking longer than usual, please be patient');
        retry();
        break;
      case 2:
        setMessage(`Redirecting back to ${redirect}`);
        setTimeout(() => history.push(`/${redirect}`), 1000);
        break;
      default: retry();
    }
  }, [waitPhase]);

  return (
    <Skeleton>
      {message}
      <ProgressSpinner size='4rem' />
    </Skeleton>
  );
};

LoadingView.propTypes = {
  redirect: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  initialMessage: PropTypes.string
};

export default LoadingView;
