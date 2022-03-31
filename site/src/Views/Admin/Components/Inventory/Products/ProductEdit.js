import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { TextField, InputAdornment } from '@mui/material';
import _ from 'lodash';

import ActionButton from '../../../../../Components/ActionButton.js';
import ProgressSpinner from '../../../../../Components/ProgressSpinner.js';
import Heading from '../../../../../Components/Heading.js';
import ImageUploader from '../../../../../Components/ImageUploader.js';
import RowGroup from '../../../../../Components/Forms/RowGroup.js';
import SelectInput from '../../../../../Components/Forms/SelectInput.js';
import { ALL_CATEGORIES_AND_SUBCATEGORIES } from '../../../../../graphql/queries.js';
import mutations from '../../../../../graphql/mutations.js';
import useDDMutation from '../../../../../hooks/useDDMutation.js';

import { FixedSizeInventorySection, EditFormContainer } from '../styledComponents.js';
import { DataLoading } from '../../../styledComponents.js';

const ProductEdit = ({ item, tableRows, updateTableRows }) => {
  const [loading, setLoading] = useState(false);
  const { data } = useQuery(ALL_CATEGORIES_AND_SUBCATEGORIES);
  const [updateProduct] = useDDMutation(mutations.UpdateProductAndRelations);

  const [fields, setFields] = useState({
    name: '',
    description: '',
    images: [],
    category: '',
    subCategory: '',
    quantity: 0,
    price: 0
  });
  const hasSelectedCategory = fields.category && fields.category !== '';

  const handleFormChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (imageUrl, action) => {
    if (!imageUrl || typeof imageUrl !== 'string') return;

    let updatedImages = [];
    if (action === 'upload') {
      updatedImages = [...fields.images, imageUrl];
    } else if (action === 'delete') {
      updatedImages = fields.images.filter(image => image !== imageUrl);
    } else {
      throw new Error(`Unknown action of '${action}' supplied to handleImageChange`);
    }
    setFields(prev => ({ ...prev, images: updatedImages }));
  };

  const getSubCategoryFields = (selectedCategory, allCategories) => {
    if (!selectedCategory || selectedCategory === '' || !allCategories || !allCategories.length) {
      return undefined;
    }
    const selected = allCategories.find(category => category.name === selectedCategory);

    return selected.subCategories.map(subCat => ({
      name: _.startCase(subCat.name),
      value: subCat.name
    }));
  };

  const handleUpdateProduct = async () => {
    setLoading(true);
    try {
      // update product document (also updates subcategory relationships if changed)
      const { data } = await updateProduct({
        variables: {
          _id: item._id,
          product_id: item.product_id,
          name: fields.name,
          images: fields.images,
          category: fields.category,
          subCategory: fields.subCategory,
          description: fields.description,
          price: fields.price,
          numInStock: fields.quantity
        }
      });

      const { __typename, _id, product_id, ...updatedFields } = data.updateProductAndRelations;
      setFields(prev => ({ ...prev, ...updatedFields }));

      const clonedTableRows = JSON.parse(JSON.stringify(tableRows));
      const indexOfUpdatedRow = clonedTableRows.findIndex(row => row.id === item.product_id);

      clonedTableRows[indexOfUpdatedRow] = {
        id: item.product_id,
        name: updatedFields.name,
        numInStock: updatedFields.numInStock,
        price: updatedFields.price,
        category: _.startCase(updatedFields.category),
        subcategory: _.startCase(updatedFields.subCategory)
      };
      updateTableRows(clonedTableRows);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (item && item.name) {
      const itemFields = {
        name: item.name,
        description: item.description,
        images: item.images,
        category: item.category,
        subCategory: item.subCategory,
        quantity: item.numInStock,
        price: item.price
      };
      if (itemFields !== fields) {
        setFields(itemFields);
      }
    }
  }, [item]);

  return (

    <FixedSizeInventorySection>
      <Heading
        text={item && item.name ? 'Edit product' : 'Create new product'} size='small'
        noSpace
      />
      {
        data && data.categories ? (
          <>
            <EditFormContainer>
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
                value={fields.description}
                variant='outlined'
                onChange={handleFormChange}
                fullWidth
                multiline
                rows={5}
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
              <ImageUploader
                onUpload={(imageUrl) => handleImageChange(imageUrl, 'upload')}
                images={fields.images}
              />
            </EditFormContainer>
            <ActionButton
              text='save'
              onClick={handleUpdateProduct}
              loading={loading}
              customStyles={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(63, 81, 181, 1)',
                borderColor: '#fff',
                color: '#fff',
                width: '6rem',
                height: '2.5rem'
              }}
            />
          </>
        ) : (
          <DataLoading>
            <ProgressSpinner size='3rem' colour='blue' />
          </DataLoading>
        )
      }
    </FixedSizeInventorySection>
  );
};

ProductEdit.propTypes = {
  item: PropTypes.object,
  tableRows: PropTypes.array.isRequired,
  updateTableRows: PropTypes.func.isRequired
};

export default ProductEdit;
