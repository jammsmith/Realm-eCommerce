// External imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline, IoCheckmarkSharp, IoMailOutline } from 'react-icons/io5';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

// Components
import ActionButton from '../ActionButton.js';

// Styles
import fonts from '../../styles/fonts.js';
import colours from '../../styles/colours.js';

const { standard } = fonts;
const { dark, light } = colours;

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

//
const AddToCart = ({ product, handleAddToCart, itemsInCart, addingToCart }) => {
  const [isProductInCart, setIsProductInCart] = useState(false);
  useEffect(() => {
    if (itemsInCart) {
      const found = itemsInCart.find(item => item.product._id === product._id);
      if (found) setIsProductInCart(true);
    }
  }, [itemsInCart, setIsProductInCart, product]);

  // Custom styles for button
  const styles = {
    fontFamily: standard,
    background: dark,
    color: light,
    width: '100%'
  };
  //
  let addToCartText;
  if (product.numInStock > 0) {
    addToCartText =
      <>
        Add To Cart
        &nbsp;<IoCartOutline />
      </>;
  } else {
    addToCartText =
      <>
        Request this product
        &nbsp;<IoMailOutline />
      </>;
  }
  const addedToCartText =
    <>
      Added to cart
      &nbsp; <IoCheckmarkSharp />
    </>;

  return (
    addingToCart.isLoading && addingToCart.productId === product.product_id
      ? <ProgressWrapper>
        <CircularProgress color='inherit' />
        </ProgressWrapper>
      : <ActionButton
        text={isProductInCart ? addedToCartText : addToCartText}
        disabled={isProductInCart && true}
        onClick={handleAddToCart}
        name='addToCart'
        value={product.product_id}
        variant='contained'
        customStyles={styles}
      />
  );
};

AddToCart.propTypes = {
  product: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  itemsInCart: PropTypes.object,
  addingToCart: PropTypes.bool.isRequired
};

export default AddToCart;
