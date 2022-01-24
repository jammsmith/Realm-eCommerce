import styled from 'styled-components';
import colours from '../../../../styles/colours.js';

const { dark } = colours;

export const CheckoutFormsWrapper = styled.div`
  border: 0.05rem solid ${dark};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
  min-height: 600px;
  padding: 0 0.15rem;
  width: 100%;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2); 
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 1rem;
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
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const PersonalDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CheckboxWrapper = styled.div`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;
