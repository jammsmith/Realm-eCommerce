import styled from 'styled-components';
import { Link as LinkTo } from 'react-router-dom';

import colours from '../../styles/colours';

const { light } = colours;

const Link = styled(LinkTo)`
  color: ${light};
  :hover,
  :active {
    color: ${light}
  }
`;

export default Link;
