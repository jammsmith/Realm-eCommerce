export const validateProductFields = (requestedFields) => {
  const requiredFields = ['name', 'description', 'category', 'subCategory', 'images', 'price', 'quantity'];
  const failedItems = [];

  for (const field of requiredFields) {
    if (!requestedFields[field]) {
      failedItems.push(field);
    }
  }
  if (failedItems.length) {
    return { result: 'failed', failedItems };
  }

  for (const field in requestedFields) {
    const item = requestedFields[field];
    console.log('field', field);
    console.log('item', item);
    switch (field) {
      case 'name':
      case 'description':
        if (typeof item !== 'string' || item.trim().length < 1) {
          failedItems.push(field);
        }
        break;
      case 'images':
        if (!item.length) {
          failedItems.push(field);
        }
        break;
      case 'price': {
        const parsed = parseFloat(item);
        if (parsed === 0) {
          failedItems.push(field);
        }
      }
        break;
      case 'quantity': {
        const parsed = parseInt(item);
        if (typeof parsed !== 'number') {
          failedItems.push(field);
        }
      }
        break;
      default: console.log('Skipping field. Field:', field);
    }
  }
  return failedItems.length
    ? { result: 'failed', failedItems }
    : { result: 'passed' };
};

export const validateSubCategoryFields = () => {};

export const getTrimmedFormFields = (fields) => {
  const clonedFields = Object.assign(fields, {});
  for (const field in clonedFields) {
    clonedFields[field] = field.trim();
  }
  return clonedFields;
};
