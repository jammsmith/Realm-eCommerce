exports = async function (update) {
  console.log('db_updateProduct input id\'s:', update._id, update.product_id);
  try {
    const db = context.services
      .get('mongodb-atlas')
      .db('dovesAndDandysDB');

    const products = db.collection('products');
    const subCategories = db.collection('subcategories');

    // get the exisitng document
    const existingProduct = await products.findOne({ _id: update._id });
    console.log('existingProduct._id', existingProduct._id);

    const changedFields = {};
    for (const field in update) {
      if (update[field] !== existingProduct[field]) {
        changedFields[field] = update[field];
      }
    }
    // make sure _id and product_id aren't in changed fields
    if (changedFields._id) delete changedFields._id;
    if (changedFields.product_id) delete changedFields.product_id;

    if (!Object.keys(changedFields).length) {
      return;
    }

    console.log('changedFields num:', Object.keys(changedFields).length);
    // update the product document
    const updatedEntity = await products.findOneAndUpdate(
      { _id: update._id },
      { $set: changedFields },
      { returnNewDocument: true }
    );

    // update the subcategory->products array (only if subcategory has changed)
    if (update.subCategory !== existingProduct.subCategory) {
      console.log('update.subCategory', update.subCategory);
      console.log('existingProduct.subCategory', existingProduct.subCategory);
      // remove from products array in subCategory that its move out of
      const existingSubCategory = await subCategories.findOne(
        { products: { $in: [existingProduct.product_id] } }
      );
      console.log('existingSubCategory.name', existingSubCategory.name);

      const updatedProductsArray = existingSubCategory.products.filter(product => product !== existingProduct.product_id);
      console.log('updatedProductsArray', updatedProductsArray);

      const removed = await subCategories.findOneAndUpdate(
        { products: existingProduct.product_id },
        {
          $set: { products: updatedProductsArray }
        },
        { returnNewDocument: true }
      );
      console.log('removed.products', removed.products);

      // add to products array in subCategory that its moved in to
      const newSubCategoryQuery = {
        $and: [
          { name: update.subCategory },
          { category: update.category }
        ]
      };
      const newSubCategory = await subCategories.findOne(newSubCategoryQuery);
      console.log('newSubCategory.name', newSubCategory.name);

      const newSubCategoryProducts = [...newSubCategory.products, existingProduct.product_id];
      console.log('newSubCategoryProducts', newSubCategoryProducts);

      const added = await subCategories.findOneAndUpdate(
        newSubCategoryQuery,
        {
          $set: { products: newSubCategoryProducts }
        },
        { returnNewDocument: true }
      );
      console.log('added.products', added.products);
    }

    return updatedEntity;
  } catch (err) {
    console.log(err);
  }
};
