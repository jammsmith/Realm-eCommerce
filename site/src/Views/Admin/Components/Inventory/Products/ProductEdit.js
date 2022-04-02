import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { TextField, InputAdornment } from '@mui/material';
import _ from 'lodash';
import uniqueString from 'unique-string';

import ActionButton from '../../../../../Components/ActionButton.js';
import ProgressSpinner from '../../../../../Components/ProgressSpinner.js';
import Heading from '../../../../../Components/Heading.js';
import ImageUploader from '../../../../../Components/ImageUploader.js';
import RowGroup from '../../../../../Components/Forms/RowGroup.js';
import SelectInput from '../../../../../Components/Forms/SelectInput.js';
import UserMessage from '../../../../../Components/UserMessage.js';
import { ALL_CATEGORIES_AND_SUBCATEGORIES } from '../../../../../graphql/queries.js';
import mutations from '../../../../../graphql/mutations.js';
import useDDMutation from '../../../../../hooks/useDDMutation.js';
import { validateProductFields } from '../../../../../helpers/inventory.js';

import {
  FixedSizeInventorySection,
  EditFormContainer,
  SubmitButtons
} from '../styledComponents.js';
import { DataLoading } from '../../../styledComponents.js';

const ProductEdit = ({ item, tableRows, updateTableRows }) => {
  const [loading, setLoading] = useState({
    type: '',
    state: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteRequested, setDeleteRequested] = useState(false);
  const selectedRowId = useRef(item.product_id);

  const { data } = useQuery(ALL_CATEGORIES_AND_SUBCATEGORIES);
  const [upsertProduct] = useDDMutation(mutations.UpsertProduct);
  const [deleteProduct] = useDDMutation(mutations.DeleteProduct);

  const shouldCreateNewProduct = !item || !item.product_id;

  const initialFields = {
    name: '',
    description: '',
    images: [],
    category: '',
    subCategory: '',
    quantity: '',
    price: ''
  };

  const [fields, setFields] = useState(initialFields);
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

  const getSubCategoryDetails = (selectedCategory, allCategories) => {
    if (!selectedCategory || selectedCategory === '' || !allCategories || !allCategories.length) {
      return undefined;
    }
    const selected = allCategories.find(category => category.name === selectedCategory);

    return selected.subCategories.map(subCat => ({
      id: subCat.subCategory_id,
      name: _.startCase(subCat.name),
      value: subCat.name
    }));
  };

  const handleUpsertProduct = async () => {
    try {
      setLoading({ type: 'upsert', state: true });
      const { result } = validateProductFields(fields);

      if (result === 'failed') {
        setMessage({
          type: 'error',
          text: 'Some form fields have failed validation, please check and resubmit'
        });
        return;
      }

      const variables = {
        product_id: shouldCreateNewProduct ? `product-${await uniqueString()}` : item.product_id,
        name: fields.name.trim(),
        images: fields.images,
        category: fields.category,
        subCategory: fields.subCategory,
        description: fields.description.trim(),
        price: parseFloat(fields.price),
        numInStock: parseInt(fields.quantity)
      };
      if (!shouldCreateNewProduct) {
        variables._id = item._id;
      }
      // update product document (also updates subcategory relationships if changed)
      const { data } = await upsertProduct({ variables });

      const { __typename, _id, product_id: productId, ...upsertedProduct } = data.upsertProduct;
      setFields(prev => ({ ...prev, upsertedProduct }));

      const formattedProduct = {
        id: productId,
        name: upsertedProduct.name,
        numInStock: upsertedProduct.numInStock,
        price: upsertedProduct.price,
        category: _.startCase(upsertedProduct.category),
        subcategory: _.startCase(upsertedProduct.subCategory)
      };

      const clonedTableRows = JSON.parse(JSON.stringify(tableRows));

      if (item && item.product_id) {
        const indexOfUpdatedRow = clonedTableRows.findIndex(row => row.id === item.product_id);
        clonedTableRows[indexOfUpdatedRow] = formattedProduct;
      } else {
        clonedTableRows.push(formattedProduct);
      }
      updateTableRows(clonedTableRows);
      setMessage({
        type: 'success',
        text: shouldCreateNewProduct ? 'Product added!' : 'Product updated!'
      });
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text: shouldCreateNewProduct ? 'Failed to create new product' : 'Failed to update product'
      });
    } finally {
      setLoading({ type: '', state: false });
    }
  };

  const handleDeleteRequested = () => {
    if (!item || !Object.keys(item).length) {
      setMessage({
        type: 'error',
        text: 'Must select a product to delete'
      });
      return;
    }
    setDeleteRequested(true);
  };

  const handleDeleteProduct = async () => {
    try {
      setLoading({ type: 'delete', state: true });
      const { data } = await deleteProduct({
        variables: { productId: item.product_id }
      });

      if (data.deleteProduct && data.deleteProduct.isDeleted) {
        const updatedRows = tableRows.filter(row => row.id !== item.product_id);
        updateTableRows(updatedRows);
        setFields(initialFields);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading({ type: '', state: false });
      setDeleteRequested(false);
    }
  };

  const populateFormFields = useCallback(() => {
    const itemFields = {
      name: item.name,
      description: item.description,
      images: item.images,
      category: item.category,
      subCategory: item.subCategory,
      quantity: item.numInStock,
      price: item.price
    };
    itemFields !== fields && setFields(itemFields);
  }, [item, fields]);

  useEffect(() => {
    if (item && item.product_id && item.product_id !== selectedRowId.current) {
      populateFormFields();
      message && setMessage(null);
      deleteRequested && setDeleteRequested(false);
      selectedRowId.current = item.product_id;
    }
  }, [item, populateFormFields, message, deleteRequested]);

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
                  label='Category*'
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
                  label='Sub Category*'
                  value={fields.subCategory}
                  variant='outlined'
                  handleChange={handleFormChange}
                  required
                  disabled={!hasSelectedCategory}
                  options={
                    hasSelectedCategory
                      ? getSubCategoryDetails(fields.category, data.categories)
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
                onDelete={(imageUrl) => handleImageChange(imageUrl, 'delete')}
                images={fields.images}
                placeholderText='No images yet! You must upload at least one image per product'
                reset={message && message.type === 'success'}
              />
            </EditFormContainer>
            <SubmitButtons>
              <ActionButton
                text='save'
                onClick={handleUpsertProduct}
                loading={loading.state === true && loading.type === 'upsert'}
                customStyles={{
                  backgroundColor: 'rgba(63, 81, 181, 1)',
                  borderColor: '#fff',
                  color: '#fff',
                  width: '6rem',
                  height: '2.5rem'
                }}
              />
              <ActionButton
                text={deleteRequested ? 'confirm deletion' : 'delete product'}
                onClick={
                  deleteRequested
                    ? handleDeleteProduct
                    : handleDeleteRequested
                }
                loading={loading.state === true && loading.type === 'delete'}
                customStyles={{
                  backgroundColor: '#fff',
                  borderColor: 'red',
                  color: 'red',
                  height: '2.5rem',
                  width: '10rem'
                }}
              />
              {message && message.type && <UserMessage text={message.text} type={message.type} />}
            </SubmitButtons>
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
