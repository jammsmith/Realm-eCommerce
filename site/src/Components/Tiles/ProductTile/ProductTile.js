// External imports
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Image from '../../Image.js';
import ActionButton from '../../ActionButton.js';
import AddToCart from '../../AddToCart.js';

// Custom styled components
import {
  OuterContainer,
  ProductContent,
  ProductTextContent,
  TextContainer,
  Text,
  InStockInfo,
  ButtonContainer,
  LineBreak,
  Description
} from './ProductTileElements.js';
import ResponsiveTileWrapper from '../ResponsiveTileWrapper.js';

// Show a single product.  Can be used 'stripped down' when showing many products
// or with all details when showing just one product
const ProductTile = ({ product, viewAsSingleProduct, linkTo, ...other }) => {
  const { name, price, image, numInStock, description } = product;

  return (
    <ResponsiveTileWrapper productTile viewAsSingleProduct={viewAsSingleProduct}>
      <OuterContainer>
        <ProductContent>
          <Image src={image} alt={name} />
          <ProductTextContent>
            <TextContainer>
              <Text>{name}</Text>
              <Text>£{price}</Text>
            </TextContainer>
            <InStockInfo>{numInStock > 0 ? 'In Stock' : 'Out of Stock'}</InStockInfo>
          </ProductTextContent>
        </ProductContent>
        {
          viewAsSingleProduct &&
            <>
              <LineBreak />
              <Description>{description}</Description>
            </>
        }
        <ButtonContainer>
          {
            !viewAsSingleProduct &&
              <ActionButton
                text='Item Description'
                linkTo={linkTo}
                customStyles={{ width: '100%' }}
              />
          }
          <AddToCart
            product={product}
            {...other}
          />
        </ButtonContainer>
      </OuterContainer>
    </ResponsiveTileWrapper>
  );
};

ProductTile.propTypes = {
  product: PropTypes.object.isRequired,
  viewAsSingleProduct: PropTypes.bool,
  linkTo: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired,
  addingToCart: PropTypes.object.isRequired,
  updateAddingToCart: PropTypes.func.isRequired,
  activeOrder: PropTypes.object,
  updateActiveOrder: PropTypes.func.isRequired
};

export default ProductTile;
