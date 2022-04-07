// External imports
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Custom styled components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align === 'left' ? 'flex-start' : 'center'};
  justify-content: ${({ align }) => align === 'left' ? 'flex-start' : 'center'};
  margin: ${({ align }) => align === 'left' ? '1rem 0 1rem 1rem' : '1rem 0'};
`;

export const Heading = styled.h2`
  font-size: 1.5rem;
  text-align: ${({ align }) => align || 'center'};
  padding-bottom: 1rem;
  max-width: 85%;
  @media (min-width: 650px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 2.5rem;
    max-width: 50%;
  }
  @media (min-width: 1024px) {
    font-size: 2.75rem;
  }
`;

export const Text = styled.p`
  text-align: ${({ align }) => align || 'center'};
  font-size: 1.15rem;
  letter-spacing: 1.5px
  line-height: 2rem;
  width: 90%;
  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

//
const TextSection = ({ heading, text, secondaryText, align }) => {
  return (
    <Wrapper align={align}>
      <Heading align={align}>{heading}</Heading>
      <Text align={align}>{text}</Text>
      {secondaryText && <Text>{secondaryText}</Text>}
    </Wrapper>
  );
};

TextSection.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  align: PropTypes.string
};

export default TextSection;
