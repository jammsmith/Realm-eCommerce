import styled from 'styled-components';

export const CheckoutFormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.15rem;
  width: 100%;
  @media (min-width: 600px) {
    max-width: 900px;
    flex-direction: row;
    margin: auto;
  }
`;

export const FormWrapper = styled.div`
  margin: 1rem;
  @media (min-width: 600px) {
    width: 50%;
    margin: 2rem;
  }
`;

export const FormHeader = styled.h6`
  color: black;
  margin-bottom: 2rem;
`;

export const Warning = styled.p`
  color: red;
  margin-top: 1rem;
`;

export const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PersonalDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
