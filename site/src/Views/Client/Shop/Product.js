// External imports
import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

// Custom components
import ProductTile from '../../../Components/Tiles/ProductTile/ProductTile.js';
import TextSection from '../../../Components/TextSection.js';
import SectionSpacer from '../../../Components/SectionSpacer.js';
import ActionButton from '../../../Components/ActionButton.js';
import SingleProduct from '../../../Components/Queries/SingleProduct.js';

// Colours
import colours from '../../../styles/colours.js';
const { dark, light } = colours;

// Custom styled components
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: auto;
  width: 95%;
`;

// Return a single product
const Product = () => {
  const { url } = useRouteMatch();
  const { subCategory, productId } = useParams();

  // Create URL to navigate back to Sub-Category
  const goBackUrl = url.replace(`/${productId}`, '');

  return (
    <SingleProduct id={productId}>
      {
        product => {
          return (
            <>
              <ProductTile
                product={product}
                viewAsSingleProduct
              />
              <SectionSpacer dark spaceAbove spaceBelow />
              <TextSection
                heading="Not quite what you're looking for?"
                text="We pride ourselves on our bespoke service, if there's something specific you would like then please get in touch - we can almost certainly do it!"
              />
              <ButtonContainer>
                <ActionButton
                  text='Get in touch'
                  linkTo='/contact-us'
                  customStyles={{ background: dark, color: light }}
                />
                <ActionButton
                  text={`Back to ${_.upperCase(subCategory)}`}
                  linkTo={goBackUrl}
                />
              </ButtonContainer>
            </>
          );
        }
      }
    </SingleProduct>
  );
};

export default Product;
