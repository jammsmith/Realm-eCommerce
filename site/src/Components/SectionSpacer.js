// External imports
import styled, { css } from 'styled-components';

// Colours
import colours from '../styles/colours';
const { dark, light } = colours;

// Block spacer to be used between sections of a page
const SectionSpacer = styled.div`
  height: 1rem;
  ${props =>
    props.spaceAbove &&
    css`
      margin-top: 2rem;
    `}
  ${props =>
    props.spaceBelow &&
    css`
      margin-bottom: 2rem;
    `}
  ${props =>
    props.dark &&
    css`
      background-color: ${dark};
      color: ${light};
    `}
`;

export default SectionSpacer;
