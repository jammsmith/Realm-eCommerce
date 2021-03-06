import styled from 'styled-components';

export const CheckoutFormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export const PaymentFormItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
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
  margin-bottom: 0.5rem;
`;
