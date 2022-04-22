// External imports
import styled, { css } from 'styled-components';

// Colours
import colours from '../styles/colours';
const { dark, light } = colours;

// Block spacer to be used between sections of a page
const SectionSpacer = styled.div`
  height: 0.25rem;
  ${props =>
    props.spaceAbove &&
    css`
      margin-top: 1.5rem;
    `}
  ${props =>
    props.spaceBelow &&
    css`
      margin-bottom: 1.5rem;
    `}
  ${props =>
    props.dark &&
    css`
      background-color: ${dark};
      color: ${light};
    `}
`;

export default SectionSpacer;
