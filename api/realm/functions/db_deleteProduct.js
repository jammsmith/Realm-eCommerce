exports = async function (productId) {
  console.log('product_id:', productId);
  try {
    const db = context.services
      .get('mongodb-atlas')
      .db('dovesAndDandysDB');

    const products = db.collection('products');
    const subCategories = db.collection('subcategories');

    const deleteProduct = async () => {
      try {
        return await products.deleteOne({ product_id: productId });
      } catch (err) {
        return err;
      }
    };

    const removeFromExistingRelationArray = async () => {
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

    const result = await deleteProduct();
    console.log('result.deletedCount', result.deletedCount);

    if (result.deletedCount === 1) {
      await removeFromExistingRelationArray();
      return {
        productId: productId,
        isDeleted: true
      };
    }
  } catch (err) {
    console.log(err);
  }
};