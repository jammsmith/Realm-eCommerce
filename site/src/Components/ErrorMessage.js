import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoAlertCircleOutline } from 'react-icons/io5';

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 0.25rem auto;
`;
const Message = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 0;
`;
const Icon = styled(IoAlertCircleOutline)`
  color: red; 
  font-size: 1.25rem;
`;

const ErrorMessage = ({ message }) => {
  return (
    <Wrapper>
      <Icon />
      <Message>{message}</Message>
    </Wrapper>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
