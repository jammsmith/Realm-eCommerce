import styled from 'styled-components';

export const Shadow = styled.div`
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;

  @media (min-width: 768px) {
    display: none;
  }
`;
