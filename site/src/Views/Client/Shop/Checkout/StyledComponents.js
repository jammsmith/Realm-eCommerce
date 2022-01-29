import styled from 'styled-components';

// Colours
import colours from '../../../../styles/colours.js';
const { darkFade } = colours;

export const CheckoutFormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  margin: 0.5rem auto;
  width: 96%;
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

export const CheckoutItem = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  border-radius: 5px;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

export const CheckoutHeading = styled.h4`
  padding: 0.5rem 0 0.25rem 0.25rem;
  margin-bottom: 0.25rem;
  border-bottom: 1px solid ${darkFade};
`;

export const Warning = styled.p`
  color: red;
  margin-top: 1rem;
`;

export const SelectAddress = styled.div`
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

export const PersonalDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CheckboxWrapper = styled.div`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
`;

export const SummaryWrapper = styled.div`
  min-height: 600px;
  margin: 0.5rem auto;
  width: 96%;
  @media (min-width: 1024px) {
    width: 40%;
  }
`;

export const SummaryItem = styled(CheckoutItem)`
  flex-direction: column
`;

export const SummaryRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

export const Text = styled.p`
  margin-bottom: 0;
`;
