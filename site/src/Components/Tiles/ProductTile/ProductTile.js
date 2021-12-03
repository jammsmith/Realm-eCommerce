// External imports
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Image from '../../Image.js';
import ActionButton from '../../ActionButton.js';
import AddToCart from '../../Cart/AddToCart.js';

// Custom styled components
import {
  OuterContainer,
  ProductContent,
  ProductTextContent,
  TextContainer,
  ProductTitle,
  ProductPrice,
  InStockInfo,
  ButtonContainer,
  LineBreak,
  Description
} from './ProductTileElements.js';

// Show a single product.  Can be used 'stripped down' when showing many products
// or with all details when showing just one product
const ProductTile = ({ product, linkTo, viewAsSingleProduct, handleAddToCart, itemsInCart }) => {
  const { name, price, image, numInStock, description } = product;

  return (
    <OuterContainer>
      <ProductContent>
        <Image src={image} alt={name} />
        <ProductTextContent>
          <TextContainer>
            <ProductTitle>{name}</ProductTitle>
            <ProductPrice>£{price}</ProductPrice>
          </TextContainer>
          <InStockInfo>{numInStock > 0 ? 'Product in Stock' : 'Out of Stock'}</InStockInfo>
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
        <AddToCart product={product} handleAddToCart={handleAddToCart} itemsInCart={itemsInCart} />
      </ButtonContainer>
    </OuterContainer>
  );
};

ProductTile.propTypes = {
  product: PropTypes.object.isRequired,
  linkTo: PropTypes.string,
  viewAsSingleProduct: PropTypes.bool,
  handleAddToCart: PropTypes.func.isRequired,
  itemsInCart: PropTypes.object
};

export default ProductTile;
