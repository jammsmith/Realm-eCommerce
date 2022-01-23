// External imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IoCartOutline, IoMailOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

// Components
import ActionButton from './ActionButton.js';
import ProgressSpinner from './ProgressSpinner.js';

// Styles
import fonts from '../styles/fonts.js';
import colours from '../styles/colours.js';

const { standard } = fonts;
const { dark, light } = colours;

//
const AddToCart = ({ product, handleAddToCart, itemsInCart, addingToCart }) => {
  const history = useHistory();
  const [productInCart, setProductInCart] = useState(false);
  const [buttonText, setButtonText] = useState();

  useEffect(() => {
    if (itemsInCart) {
      const found = itemsInCart.find(item => item.product._id === product._id);
      if (found) setProductInCart(true);
    }
  }, [itemsInCart, setProductInCart, product]);

  // Custom styles for button
  const styles = {
    fontFamily: standard,
    background: dark,
    color: light,
    width: '100%'
  };
  //

  useEffect(() => {
    if (productInCart) {
      setButtonText('Added - View in Cart');
    } else if (product.numInStock > 0) {
      setButtonText(
        <>
          Add To Cart
          <IoCartOutline />
        </>);
    } else {
      setButtonText(
        <>
        Request this product
          <IoMailOutline />
        </>);
    }
  }, [setButtonText, productInCart, product, itemsInCart]);

  const isLoading = addingToCart.isLoading && addingToCart.productId === product.product_id;
  return (
    product.numInStock > 0
      ? <ActionButton
        text={isLoading ? <ProgressSpinner colour='light' size='1.5rem' /> : buttonText}
        onClick={productInCart ? () => history.push('/cart') : handleAddToCart}
        name='addToCart'
        value={product.product_id}
        variant='contained'
        customStyles={styles}
        disabled={isLoading}
      />
      : <ActionButton
        text={buttonText}
        customStyles={styles}
        onClick={() => history.push('/contact-us')}
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
