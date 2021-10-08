// External imports
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Custom styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const TextHeading = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  padding-bottom: 1rem;
  max-width: 75%;
  @media (min-width: 650px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 2.5rem;
    max-width: 50%;
  }
  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const TextBody = styled.p`
  text-align: center;
  font-size: 1.15rem;
  letter-spacing: 1.5px
  line-height: 2rem;
  width: 90%;
  @media (min-width: 768px) {
    max-width: 70%;
  }
  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

//
const TextSection = ({ heading, text, secondaryText }) => {
  return (
    <Wrapper>
      <TextHeading>{heading}</TextHeading>
      <TextBody>{text}</TextBody>
      {secondaryText && <TextBody>{secondaryText}</TextBody>}
    </Wrapper>
  );
};

TextSection.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  secondaryText: PropTypes.string
};

export default TextSection;
