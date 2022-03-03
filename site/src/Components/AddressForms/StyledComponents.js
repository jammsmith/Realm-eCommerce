import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  -webkit-box-shadow: ${props => !props.useFormOnly && '-3px -1px 10px 2px rgba(0,0,0,0.2)'};
  box-shadow: ${props => !props.useFormOnly && '-3px -1px 10px 2px rgba(0,0,0,0.2)'};
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

export const SelectAddress = styled.div`
  bottom: 0;
  display: flex;
  flex-direction: column;
  marginTop: 5.5rem;
`;

export const SpacedRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CheckboxWrapper = styled.div`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;
