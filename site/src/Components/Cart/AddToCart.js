// External imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline, IoCheckmarkSharp } from 'react-icons/io5';

// Components
import ActionButton from '../ActionButton.js';

// Styles
import fonts from '../../styles/fonts.js';
import colours from '../../styles/colours.js';

const { standard } = fonts;
const { dark, light } = colours;

//
const AddToCart = ({ product, handleAddToCart, itemsInCart }) => {
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
    addToCartText = 'Contact us to request this product';
  }
  const addedToCartText =
    <>
      Added to cart
      &nbsp; <IoCheckmarkSharp />
    </>;

  return (
    <ActionButton
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
  itemsInCart: PropTypes.object
};

export default AddToCart;
