import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import _ from 'lodash';

import AddToCart from '../../../../Components/AddToCart.js';
import LinkedHeading from '../../../../Components/Headings/LinkedHeading.js';
import TextSection from '../../../../Components/TextSection.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import ActionButton from '../../../../Components/ActionButton.js';
import LoadingView from '../../../../Components/LoadingView.js';
import ImageViewer from './ImageViewer.js';
import colours from '../../../../styles/colours.js';
import useScrollToTop from '../../../../hooks/useScrollToTop.js';
import { SINGLE_PRODUCT } from '../../../../graphql/queries.js';
import { getPriceInCurrency } from '../../../../helpers/price.js';

import {
  ProductWrapper,
  MainContent,
  ProductInfo,
  AddToCartWrapper,
  ContactUsWrapper,
  Spacer
} from './styledComponents.js';
import { HeadingWrapper } from '../styledComponents.js';

const { dark, light } = colours;

// Return a single product
const Product = ({ currency, ...other }) => {
  useScrollToTop();
  const { category, subCategory, productId } = useParams();

  const { data } = useQuery(SINGLE_PRODUCT, {
    variables: { id: productId }
  });

  return (
    data && data.product ? (
      <>
        <ProductWrapper>
          <ImageViewer images={data.product.images} />
          <MainContent>
            <ProductInfo>
              <div>
                <HeadingWrapper>
                  <LinkedHeading
                    text={data.product.name}
                    headingSize='large'
                    buttonText={`back to ${_.startCase(subCategory)}`}
                    linkTo={`/shop/browse/${category}/${subCategory}`}
                  />
                </HeadingWrapper>
                <p>{data.product.description}</p>
              </div>
              <div>
                <h5>{data.product.numInStock ? 'In stock ready for delivery!' : 'Please contact us to request this item'}</h5>
                <h5>{getPriceInCurrency(data.product, currency)}</h5>
              </div>
            </ProductInfo>
            <Spacer />
            <AddToCartWrapper>
              <AddToCart product={data.product} {...other} />
            </AddToCartWrapper>
          </MainContent>
        </ProductWrapper>
        <SectionSpacer dark spaceAbove spaceBelow />
        <ContactUsWrapper>
          <TextSection
            heading="Not quite what you're looking for?"
            text="We pride ourselves on our bespoke service, if there's something specific you would like then please get in touch - we can almost certainly do it!"
          />
          <ActionButton
            text='Get in touch'
            linkTo='/contact-us'
            customStyles={{
              background: dark,
              color: light,
              width: '100%',
              maxWidth: '300px',
              height: '60px',
              borderRadius: '6px'
            }}
          />
        </ContactUsWrapper>
      </>
    ) : <LoadingView />
  );
};

Product.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  addingToCart: PropTypes.object.isRequired,
  updateAddingToCart: PropTypes.func.isRequired,
  activeOrder: PropTypes.object,
  updateActiveOrder: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired
};

export default Product;
