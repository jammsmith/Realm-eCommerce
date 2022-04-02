import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { TextField } from '@mui/material';
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
import { validateSubCategoryFields, getTrimmedFormFields } from '../../../../../helpers/inventory.js';

import {
  EditInventorySection,
  EditFormContainer,
  SubmitButtons
} from '../styledComponents.js';
import { DataLoading } from '../../../styledComponents.js';
import { HeadingWrapper } from '../../DialogHeading.js';

const SubCategoryEdit = ({ item, resetItem, tableRows, updateTableRows }) => {
  const [loading, setLoading] = useState({
    type: '',
    state: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteRequested, setDeleteRequested] = useState(false);
  const selectedRowId = useRef(item.subCategory_id);

  const { data } = useQuery(ALL_CATEGORIES_AND_SUBCATEGORIES);
  const [upsertSubCategory] = useDDMutation(mutations.UpsertSubCategory);
  const [deleteSubCategory] = useDDMutation(mutations.DeleteSubCategory);

  const shouldCreateNewSubCategory = !item || Object.keys(item).length === 0;

  const initialFields = {
    name: '',
    description: '',
    image: '',
    category: ''
  };

  const [fields, setFields] = useState(initialFields);

  const handleFormChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (imageUrl, action) => {
    if (!imageUrl || typeof imageUrl !== 'string') return;

    let updatedImage;
    if (action === 'upload') {
      updatedImage = imageUrl;
    } else if (action === 'delete') {
      updatedImage = '';
    }
    setFields(prev => ({ ...prev, image: updatedImage }));
  };

  const handleUpsertSubCategory = async () => {
    try {
      setLoading({ type: 'upsert', state: true });
      const { result } = validateSubCategoryFields(fields);

      if (result === 'failed') {
        setMessage({
          type: 'error',
          text: 'Some form fields have failed validation, please check and resubmit'
        });
        return;
      }

      const trimmedFields = getTrimmedFormFields(fields);

      const variables = {
        subCategory_id: shouldCreateNewSubCategory ? `subCategory-${await uniqueString()}` : item.subCategory_id,
        ...trimmedFields
      };
      if (!shouldCreateNewSubCategory) {
        variables._id = item._id;
      }
      // update product document (also updates subcategory relationships if changed)
      const { data } = await upsertSubCategory({ variables });

      const { __typename, _id, subCategory_id: subCategoryId, ...upsertedSubCategory } = data.upsertSubCategory;
      setFields(prev => ({ ...prev, upsertedSubCategory }));

      const formattedSubCategory = {
        id: subCategoryId,
        name: upsertedSubCategory.name,
        category: upsertedSubCategory.category
      };

      const clonedTableRows = JSON.parse(JSON.stringify(tableRows));

      if (!shouldCreateNewSubCategory) {
        const indexOfUpdatedRow = clonedTableRows.findIndex(row => row.id === item.subCategory_id);
        clonedTableRows[indexOfUpdatedRow] = formattedSubCategory;
      } else {
        clonedTableRows.push(formattedSubCategory);
      }
      updateTableRows(clonedTableRows);
      setMessage({
        type: 'success',
        text: shouldCreateNewSubCategory ? 'Sub-category added!' : 'Sub-category updated!'
      });
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text: shouldCreateNewSubCategory ? 'Failed to create new sub-category' : 'Failed to update sub-category'
      });
    } finally {
      setLoading({ type: '', state: false });
    }
  };

  const handleDeleteRequested = () => {
    if (!item || !Object.keys(item).length) {
      setMessage({
        type: 'error',
        text: 'Must select a sub-category to delete'
      });
      return;
    }
    setDeleteRequested(true);
  };

  const handleDeleteSubCategory = async () => {
    try {
      setLoading({ type: 'delete', state: true });
      const { data } = await deleteSubCategory({
        variables: { subCategoryId: item.subCategory_id }
      });

      if (data.deleteSubCategory && data.deleteSubCategory.isDeleted) {
        const updatedRows = tableRows.filter(row => row.id !== item.subCategory_id);
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
      image: item.images,
      category: item.category
    };
    itemFields !== fields && setFields(itemFields);
  }, [item, fields]);

  useEffect(() => {
    if (item && Object.keys(item).length === 0) {
      setFields(initialFields);
    }
    if (item && item.subCategory_id && item.subCategory_id !== selectedRowId.current) {
      populateFormFields();
      message && setMessage(null);
      deleteRequested && setDeleteRequested(false);
      selectedRowId.current = item.subCategory_id;
    }
  }, [item, populateFormFields, message, deleteRequested]);

  return (
    <EditInventorySection>
      <HeadingWrapper subHeading>
        <div style={{ flex: 1 }}>
          <Heading
            text={item && item.name ? 'Edit sub-category' : 'Create new sub-category'}
            noSpace
            size='small'
          />
        </div>
        {
          !shouldCreateNewSubCategory &&
            <ActionButton
              text='create new'
              onClick={resetItem}
            />
        }
      </HeadingWrapper>
      {
        data && data.categories ? (
          <>
            <EditFormContainer>
              <TextField
                name='name'
                label='Sub-Category Name'
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
              </RowGroup>
              <ImageUploader
                onUpload={(imageUrl) => handleImageChange(imageUrl, 'upload')}
                onDelete={(imageUrl) => handleImageChange(imageUrl, 'delete')}
                images={[fields.image]}
                placeholderText='No images yet! You must upload an image for each sub-category'
                reset={message && message.type === 'success'}
              />
            </EditFormContainer>
            <SubmitButtons>
              <ActionButton
                text='save'
                onClick={handleUpsertSubCategory}
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
                text={deleteRequested ? 'confirm deletion' : 'delete subcategory'}
                onClick={
                  deleteRequested
                    ? handleDeleteSubCategory
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
    </EditInventorySection>
  );
};

SubCategoryEdit.propTypes = {
  item: PropTypes.object,
  resetItem: PropTypes.func.isRequired,
  tableRows: PropTypes.array.isRequired,
  updateTableRows: PropTypes.func.isRequired
};

export default SubCategoryEdit;
