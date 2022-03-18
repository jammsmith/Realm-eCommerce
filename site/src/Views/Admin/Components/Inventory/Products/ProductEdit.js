import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { TextField, InputAdornment } from '@mui/material';
import _ from 'lodash';

import Heading from '../../../../../Components/Heading.js';
import ImageUploader from '../../../../../Components/ImageUploader.js';
import RowGroup from '../../../../../Components/Forms/RowGroup.js';
import SelectInput from '../../../../../Components/Forms/SelectInput.js';
import { InventorySection } from '../styledComponents.js';
import { ALL_CATEGORIES_AND_SUBCATEGORIES } from '../../../../../graphql/queries.js';
import { toTwoDecimalPlaces } from '../../../../../helpers/price.js';

const ProductEdit = ({ item }) => {
  const { data } = useQuery(ALL_CATEGORIES_AND_SUBCATEGORIES);
  const [fields, setFields] = useState({
    name: '',
    description: '',
    images: [],
    category: '',
    subCategory: '',
    quantity: '',
    price: 0
  });
  const hasSelectedCategory = fields.category && fields.category !== '';
  console.log('hasSelectedCategory', hasSelectedCategory);

  const handleFormChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onImageUpload = (url) => {
    setFields([...fields.images, url]);
  };

  const getSubCategoryFields = (selectedCategory, allCategories) => {
    if (!selectedCategory || selectedCategory === '') {
      return undefined;
    }
    const selected = allCategories.find(category => category.name === selectedCategory);

    return selected.subCategories.map(subCat => ({
      name: _.startCase(subCat.name),
      value: subCat.name
    }));
  };

  return (
    data && data.categories
      ? <InventorySection>
        {
          !item.name ? (
            <p>Select a product or click below to create a new product</p>
          ) : (
            <>
              <Heading text={item.name} size='small' />
              <form>
                <TextField
                  name='name'
                  label='Product Name'
                  value={fields.name}
                  variant='outlined'
                  onChange={handleFormChange}
                  fullWidth
                  required
                />
                <TextField
                  name='description'
                  label='Description'
                  variant='outlined'
                  onChange={handleFormChange}
                  fullWidth
                  multiline
                  rows={7}
                  required
                />
                <RowGroup>
                  <SelectInput
                    name='category'
                    label='Category'
                    value={fields.category}
                    variant='outlined'
                    handleChange={handleFormChange}
                    required
                    options={
                      data.categories.map(category => ({
                        name: _.startCase(category.name),
                        value: category.name
                      }))
                    }
                  />
                  <SelectInput
                    name='subCategory'
                    label='Sub Category'
                    value={fields.subCategory}
                    variant='outlined'
                    handleChange={handleFormChange}
                    required
                    disabled={!hasSelectedCategory}
                    options={
                      hasSelectedCategory
                        ? getSubCategoryFields(fields.category, data.categories)
                        : []
                    }
                  />
                </RowGroup>
                <RowGroup>
                  <TextField
                    name='quantity'
                    label='Quantity'
                    value={fields.quantity}
                    variant='outlined'
                    onChange={handleFormChange}
                    required
                    fullWidth
                  />
                  <TextField
                    name='price'
                    label='Price'
                    value={fields.price}
                    variant='outlined'
                    onChange={handleFormChange}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>£</InputAdornment>
                    }}
                  />
                </RowGroup>
                <ImageUploader onUpload={onImageUpload} />
              </form>
            </>
          )
        }
        </InventorySection>
      : null
  );
};

ProductEdit.propTypes = {
  item: PropTypes.object
};

export default ProductEdit;
