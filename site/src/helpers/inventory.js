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

    switch (field) {
      case 'name':
      case 'description':
        if (typeof item !== 'string' || item.trim().length < 1) {
          failedItems.push(item);
        }
        break;
      case 'images':
        if (!item.length) {
          failedItems.push(item);
        }
        break;
      case 'price':
        if (typeof item !== 'number' || item === 0) {
          failedItems.push(item);
        }
        break;
      case 'quantity':
        if (typeof item !== 'number') {
          failedItems.push(item);
        }
        break;
      default: console.error('Unknown field type');
    }
  }
  return failedItems.length
    ? { result: 'failed', failedItems }
    : { result: 'passed' };
};
