import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const Heading = styled.h1`
  font-size: 1.35rem;
  text-align: center;
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const MainText = styled.p`
  text-align: center;
  font-size: 1.15rem;
  letter-spacing: 1.5px
  line-height: 2rem;
  @media (min-width: 1024px) {
    font-size: 1.15rem;
    line-height: 2.15rem;
  }
`;

const Testimonial = ({ heading, text, isLastSlide }) => {
  return (
    <Wrapper>
      <Heading>{heading}</Heading>
      <MainText>{isLastSlide ? text : `"${text}"`}</MainText>
    </Wrapper>
  );
};

Testimonial.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isLastSlide: PropTypes.bool
};

export default Testimonial;
