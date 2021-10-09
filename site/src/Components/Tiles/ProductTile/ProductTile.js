// External imports
import React from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline } from 'react-icons/io5';

// Mutations
import useDDMutation from '../../../hooks/useDDMutation.js';
import mutations from '../../../graphql/mutations.js';

// Components
import Image from '../../Image.js';
import ActionButton from '../../ActionButton.js';

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

// Colours
import colours from '../../../styles/colours.js';
const { dark, light } = colours;

// Show a single product.  Can be used 'stripped down' when showing many products
// or with all details when showing just one product
const ProductTile = props => {
  const { name, price, image, numInStock, linkTo, description, viewAsSingleProduct } = props;

  const [addItemToOrder] = useDDMutation(mutations.AddItemToOrder, {
    size: '------------------test-------------------',
    quantity: 11,
    orderId: '615c2e7039375f1ed9901dbb',
    productId: '615c2e6f39375f1ed9901d89'
  });

  let addToCartText;
  if (numInStock > 0) {
    const text = 'Add To Cart';
    addToCartText =
      <>
        {text}&nbsp;
        <IoCartOutline />
      </>;
  } else {
    addToCartText = 'Contact us to request this product';
  }

  const handleAddToCart = () => {
    addItemToOrder();
  };

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
        {/* Add to cart button should add item but stay on current page so no Link */}
        <ActionButton
          text={addToCartText}
          customStyles={{ background: dark, color: light, width: '100%' }}
          variant='contained'
          onClick={handleAddToCart}
        />
      </ButtonContainer>
    </OuterContainer>
  );
};

ProductTile.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  numInStock: PropTypes.number.isRequired,
  linkTo: PropTypes.string,
  viewAsSingleProduct: PropTypes.bool,
  description: PropTypes.string
};

export default ProductTile;
