import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import _ from 'lodash';
import { TextField } from '@mui/material';

import { PRODUCTS_SEARCH, SINGLE_PRODUCT } from '../../../../../graphql/queries';
import PaginatedTable from '../../../../../Components/Table/PaginatedTable.js';
import ActionButton from '../../../../../Components/ActionButton.js';
import UserMessage from '../../../../../Components/UserMessage.js';

import { SearchWrapper, Item, InventorySection } from '../styledComponents.js';

const ProductTable = ({ rows, updateRows, reset, handleItemSelected }) => {
  const [error, setError] = useState('');
  const searchTerm = useRef('');

  const buildRows = (id, name, category, subcategory, numInStock, price) => ({
    id,
    name,
    category: _.startCase(category),
    subcategory: _.startCase(subcategory),
    numInStock,
    price
  });

  const [searchFunc] = useLazyQuery(PRODUCTS_SEARCH, {
    onCompleted: (data) => {
      if (data && data.productSearch && data.productSearch.length) {
        const mappedRows = data.productSearch.map(product => buildRows(
          product.product_id,
          product.name,
          product.category,
          product.subCategory,
          product.numInStock,
          product.price
        ));
        if (rows !== mappedRows) {
          updateRows(mappedRows);
        }
      }
    },
    onError: setError
  });
  const searchProducts = useCallback(searchFunc, [searchTerm.current]);
  useEffect(() => {
    if (!rows || !rows.length || reset) {
      searchProducts();
    }
  }, [rows, reset]);

  const [getSelectedProduct] = useLazyQuery(SINGLE_PRODUCT, {
    onCompleted: (data) => {
      handleItemSelected(data.product);
    },
    onError: setError
  });

  const columns = [
    { name: 'name', label: 'Name' },
    { name: 'category', label: 'Category' },
    { name: 'subcategory', label: 'Sub-Category' },
    { name: 'numInStock', label: 'Stock Quantity' },
    { name: 'price', label: 'Price (GBP)' }
  ];

  return (
    <InventorySection>
      <SearchWrapper>
        <TextField
          label='Search a product by name'
          variant='outlined'
          onChange={(e) => { searchTerm.current = e.target.value; }}
          fullWidth
        />
        <ActionButton
          text='search'
          onClick={() => searchProducts({ variables: { name: searchTerm.current } })}
        />
      </SearchWrapper>
      <Item>
        <PaginatedTable
          name='products table'
          rows={rows}
          columns={columns}
          handleRowClick={(id) => getSelectedProduct({ variables: { productId: id } })}
        />
        {error && <UserMessage text={error} type='error' />}
      </Item>
    </InventorySection>
  );
};

ProductTable.propTypes = {
  rows: PropTypes.array.isRequired,
  updateRows: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired
};

export default ProductTable;
