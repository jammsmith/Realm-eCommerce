import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useRouteMatch } from 'react-router-dom';
import _ from 'lodash';

import AddToCart from '../../../../Components/AddToCart.js';
import LinkedHeading from '../../../../Components/Headings/LinkedHeading.js';
import TextSection from '../../../../Components/TextSection.js';
import SectionSpacer from '../../../../Components/SectionSpacer.js';
import ActionButton from '../../../../Components/ActionButton.js';
import SingleProduct from '../../../../Components/Queries/SingleProduct.js';
import colours from '../../../../styles/colours.js';
import ImageViewer from './ImageViewer.js';
import useScrollToTop from '../../../../hooks/useScrollToTop.js';

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
const Product = (props) => {
  useScrollToTop();
  const { category, subCategory, productId } = useParams();

  return (
    <SingleProduct id={productId}>
      {
        product => {
          return (
            <>
              <ProductWrapper>
                <ImageViewer images={product.images} />
                <MainContent>
                  <ProductInfo>
                    <div>
                      <HeadingWrapper>
                        <LinkedHeading
                          text={product.name}
                          size='large'
                          buttonText={`back to ${_.startCase(subCategory)}`}
                          linkTo={`/shop/browse/${category}/${subCategory}`}
                        />
                      </HeadingWrapper>
                      <p>{product.description}</p>
                    </div>
                    <div>
                      <h5>{product.numInStock ? 'In stock ready for delivery!' : 'Please contact us to request this item'}</h5>
                      <h5>£{product.price}</h5>
                    </div>
                  </ProductInfo>
                  <Spacer />
                  <AddToCartWrapper>
                    <AddToCart product={product} {...props} />
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
          );
        }
      }
    </SingleProduct>
  );
};

Product.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  addingToCart: PropTypes.object.isRequired,
  updateAddingToCart: PropTypes.func.isRequired,
  activeOrder: PropTypes.object,
  updateActiveOrder: PropTypes.func.isRequired
};

export default Product;
