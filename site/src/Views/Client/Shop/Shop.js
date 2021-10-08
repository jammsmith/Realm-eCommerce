import React from 'react';
import { useParams } from 'react-router-dom';

// Views
import Category from './Category';
import SubCategory from './SubCategory';
import Product from './Product';

// Components
import SectionSpacer from '../../../Components/SectionSpacer.js';

const Shop = () => {
  const { category, subCategory, productId } = useParams();
  let shopView;

  if (category && subCategory === undefined) {
    shopView = <Category />;
  }
  if (subCategory && productId === undefined) {
    shopView = <SubCategory />;
  }
  if (productId) {
    shopView = <Product />;
  }

  return (
    <>
      <SectionSpacer dark spaceBelow />
      {
        shopView || <h4>Sorry - there's nothing here.  Please go back to the homepage and try again. </h4>
      }
      <SectionSpacer spaceBelow />
    </>
  );
};

export default Shop;
