import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Heading = styled.h3`
  text-align: center;
  max-width: 80%;
`;

const MainText = styled.p`
  text-align: center;
  font-size: 1.35rem;
  letter-spacing: 0.05rem;
  line-height: 2rem;
`;

const Testimonial = (props) => {
  return (
    <Wrapper>
      <Heading>{props.heading}</Heading>
      <MainText>"{props.text}"</MainText>
    </Wrapper>
  );
};

export default Testimonial;
