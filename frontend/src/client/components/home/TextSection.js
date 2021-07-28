import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  min-height: 300px;
`;

const TextHeading = styled.h2`
  font-size: 2.3rem;
  text-align: center;
  padding-bottom: 1rem;
  max-width: 40%;
`;

const MainText = styled.p`
  text-align: center;
  font-size: 1.4rem;
  letter-spacing: 0.05rem;
  line-height: 2rem;
  max-width: 70%;
`;

const TextSection = (props) => {
  const { heading, text, secondaryText } = props;

  return (
    <Wrapper>
      <TextHeading style={{ fontSize: props.headingFontSize }}>{heading}</TextHeading>
      <MainText>{text}</MainText>
      {
        secondaryText && <MainText>{secondaryText}</MainText>
      }
    </Wrapper>
  );
};

export default TextSection;
