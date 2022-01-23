import styled from 'styled-components';

export const CheckoutFormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.15rem;
  width: 100%;
  min-height: 600px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  height: 100%;
  max-width: 500px;
  
`;

export const FormHeader = styled.h6`
  color: black;
  margin-bottom: 2rem;
`;

export const Warning = styled.p`
  color: red;
  margin-top: 1rem;
`;

export const SelectAddressWrapper = styled.div`
  position: absolute:
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const PersonalDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
