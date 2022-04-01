exports = async function (update) {
  console.log('db_updateProduct input id\'s:', update._id, update.product_id);
  try {
    const db = context.services
      .get('mongodb-atlas')
      .db('dovesAndDandysDB');

    const products = db.collection('products');
    const subCategories = db.collection('subcategories');

    const upsertProduct = async (product) => {
      try {
        // get the existing product or create new one
        let upsertedProduct = {};
        let existingProduct = {};

        if (update._id) {
          existingProduct = await products.findOne({ _id: product._id });
          console.log('existingProduct._id', existingProduct._id);

          const changedFields = {};
          for (const field in product) {
            if (product[field] !== existingProduct[field]) {
              changedFields[field] = product[field];
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
          upsertedProduct = await products.findOneAndUpdate(
            { _id: product._id },
            { $set: changedFields },
            { returnNewDocument: true }
          );
        } else {
          const { insertedId } = await products.insertOne(update);
          upsertedProduct = await products.findOne({ _id: insertedId });
          console.log('Created new product. _id:', upsertedProduct._id);
        }
        return { upsertedProduct, existingProduct };
      } catch (err) {
        return err;
      }
    };

    const addToTargetRelationArray = async (productId) => {
      try {
        const newSubCategoryQuery = {
          $and: [
            { name: update.subCategory },
            { category: update.category }
          ]
        };
        const newSubCategory = await subCategories.findOne(newSubCategoryQuery);
        console.log('newSubCategory.name', newSubCategory.name);

        const newSubCategoryProducts = [...newSubCategory.products, productId];
        console.log('newSubCategoryProducts', newSubCategoryProducts);

        const added = await subCategories.findOneAndUpdate(
          newSubCategoryQuery,
          {
            $set: { products: newSubCategoryProducts }
          },
          { returnNewDocument: true }
        );
        return added.products;
      } catch (err) {
        return err;
      }
    };

    const removeFromExistingRelationArray = async (productId) => {
      try {
        const existingSubCategory = await subCategories.findOne(
          { products: { $in: [productId] } }
        );
        console.log('existingSubCategory.name', existingSubCategory.name);

        const updatedProductsArray = existingSubCategory.products.filter(product => product !== productId);
        console.log('updatedProductsArray', updatedProductsArray);

        const removed = await subCategories.findOneAndUpdate(
          { products: productId },
          {
            $set: { products: updatedProductsArray }
          },
          { returnNewDocument: true }
        );
        return removed.products;
      } catch (err) {
        return err;
      }
    };

    // Upsert product and update relevant relation arrays ->
    const { upsertedProduct, existingProduct } = await upsertProduct(update);

    if (existingProduct.subCategory && existingProduct.subCategory !== upsertedProduct.subCategory) {
      console.log('existingProduct.subCategory', existingProduct.subCategory);
      console.log('upsertedProduct.subCategory', upsertedProduct.subCategory);

      const updatedExistingArray = await removeFromExistingRelationArray(existingProduct.product_id);
      console.log('Updated existing subcategory array:', updatedExistingArray);
      const updatedTargetArray = await addToTargetRelationArray(existingProduct.product_id);
      console.log('Updated target subcategory array:', updatedTargetArray);
    } else {
      const updatedProducts = await addToTargetRelationArray(update.product_id);
      console.log('Updated products array in subcategory:', updatedProducts);
    }

    return upsertedProduct;
  } catch (err) {
    console.log(err);
  }
};
