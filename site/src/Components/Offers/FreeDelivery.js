import React, { useContext } from 'react';
import styled from 'styled-components';
import { GrDeliver } from 'react-icons/gr';

import { getFreeDeliveryConstraints } from '../../helpers/offers.js';
import { getCurrencySymbol } from '../../helpers/price.js';
import { CurrencyContext } from '../../context/CurrencyContext.js';
import colours from '../../styles/colours.js';

const Container = styled.div`
  background-color: ${colours.dark};
  color: ${colours.light};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 100%;
`;

const Icon = styled(GrDeliver)`
  background-color: ${colours.light};
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 0.25rem;
  margin-right: 1rem;
  @media (min-width: 414px) {
    font-size: 2rem;
  }
`;

const Text = styled.h5`
  font-size: 1rem;
  margin: 0;
  @media (min-width: 414px) {
    font-size: 1.5rem;
  }
`;

const FreeDelivery = () => {
  const { currency } = useContext(CurrencyContext);
  const amountConstraints = getFreeDeliveryConstraints();

  return (
    <Container>
      <Icon />
      <Text>FREE delivery on all orders over {`${getCurrencySymbol(currency)}${amountConstraints[currency]}`}!</Text>
    </Container>
  );
};

export default FreeDelivery;
