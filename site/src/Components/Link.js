// External imports
import styled from 'styled-components';
import { Link as LinkTo } from 'react-router-dom';

// Colours
import colours from '../styles/colours';
const { light } = colours;

// Show react-router-dom Link without default styles
const Link = styled(LinkTo)`
  color: ${light};
  :hover,
  :active {
    color: ${light};
    text-decoration: underline;
  }
`;

export default Link;
