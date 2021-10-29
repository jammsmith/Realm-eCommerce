// External imports
import React from 'react';
import styled from 'styled-components';

// Custom components
import Image from '../../../../Components/Image.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';

// Colours
import colours from '../../../../styles/colours.js';
const { darkFade } = colours;

// Styled components
const BasketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${darkFade};
  max-width: 350px;
  margin: auto;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
`;

const BasketDetails = styled.div`
  padding: 0.25rem;
`;

const ProductInBasket = () => {
  return (
    <BasketWrapper>
      <Image src='/images/hand-of-god.jpeg' alt='alt' />
      <ProductDetails>
        <h6>Product name</h6>
        <h6>£12.42</h6>
      </ProductDetails>
      <BasketDetails>
        <h6>Quantity: 1</h6>
      </BasketDetails>
    </BasketWrapper>
  );
};

// A view of all products that have been added to basket
const ProductList = () => {
  return (
    <>
      <ProductInBasket />
      <ProductInBasket />
      <ProductInBasket />
    </>
  );
};

const Basket = () => {
  return (
    <>
      <SectionSpacer dark spaceBelow />
      <ProductList />
    </>
  );
};

export default Basket;
