import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import uniqueString from 'unique-string';

// Views
import Category from './Category';
import SubCategory from './SubCategory';
import Product from './Product';

// Components
import SectionSpacer from '../../../Components/SectionSpacer.js';

// Other
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';
import useCurrentUser from '../../../hooks/useCurrentUser.js';
import useActiveOrder from '../../../hooks/useActiveOrder.js';

const Shop = () => {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [activeOrder, setActiveOrder] = useActiveOrder();
  const [itemsInCart, setItemsInCart] = useState();
  const [addingToCart, setAddingToCart] = useState({
    isLoading: false,
    productId: ''
  });

  // Get items currently in cart and send down to product tiles
  useEffect(() => {
    if (activeOrder && activeOrder.orderItems && activeOrder.orderItems !== itemsInCart) {
      setItemsInCart(activeOrder.orderItems);
    }
  }, [activeOrder, itemsInCart, setItemsInCart]);

  // Order mutations
  const [createGuestOrder] = useDDMutation(mutations.CreateGuestOrder);
  const [createOrderForExistingCustomer] = useDDMutation(mutations.CreateOrderForExistingCustomer);
  const [createNewOrderItem] = useDDMutation(mutations.CreateNewOrderItem);
  const [updateOrderItemsInOrder] = useDDMutation(mutations.UpdateOrderItemsInOrder);
  const [updateUserOrders] = useDDMutation(mutations.UpdateUserOrders);

  // Handler
  const handleAddToCart = async (event) => {
    const productId = event.currentTarget.value;

    // -- Current user with an active order -- //
    if (currentUser && currentUser.user_id && activeOrder) {
      try {
        setAddingToCart({
          isLoading: true,
          productId: productId
        });
        const newOrderItemId = `orderItem-${await uniqueString()}`;
        await createNewOrderItem({
          variables: {
            orderItem_id: newOrderItemId,
            order_id: activeOrder.order_id,
            product_id: productId
          }
        });
        const orderItemIds = activeOrder.orderItems.map(item => item.orderItem_id);
        orderItemIds.push(newOrderItemId);
        const response = await updateOrderItemsInOrder({
          variables: {
            order_id: activeOrder.order_id,
            orderItems: orderItemIds
          }
        });
        setActiveOrder(response.data.updateOneOrder.customer.orders[0]);
        setAddingToCart({ isLoading: false });
      } catch (err) {
        throw new Error(`Failed to add item to existing order. Error: ${err}`);
      }
    }

    // -- Current user with no active order -- //
    if (currentUser && currentUser.user_id && !activeOrder) {
      try {
        setAddingToCart({
          isLoading: true,
          productId: productId
        });
        const newOrderId = `order-${await uniqueString()}`;
        const newOrderItemId = `orderItem-${await uniqueString()}`;
        const response = await createOrderForExistingCustomer({
          variables: {
            order_id: newOrderId,
            user_id: currentUser.user_id,
            orderItem_id: newOrderItemId,
            product_id: productId
          }
        });
        const existingOrderIds =
          response.data.insertOneOrder.customer.orders.map(order => order.order_id);
        await updateUserOrders({
          variables: {
            user_id: currentUser.user_id,
            orders: [...existingOrderIds, newOrderId]
          }
        });
        setActiveOrder(response.data.insertOneOrder);
        setAddingToCart({ isLoading: false });
      } catch (err) {
        throw new Error(`Failed to add new order for existing customer. Error: ${err}`);
      }
    }

    // -- No current logged in user -- //
    if (currentUser && !currentUser.user_id) {
      try {
        setAddingToCart({
          isLoading: true,
          productId: productId
        });
        const newOrderId = `order-${await uniqueString()}`;
        const newOrderItemId = `orderItem-${await uniqueString()}`;
        const newUserId = `user-${await uniqueString()}`;
        const response = await createGuestOrder({
          variables: {
            order_id: newOrderId,
            user_ObjectId: currentUser.id,
            user_id: newUserId,
            orderItem_id: newOrderItemId,
            product_id: productId
          }
        });
        setActiveOrder(response.data.insertOneOrder.customer.orders[0]);
        setCurrentUser(response.data.insertOneOrder.customer);
        setAddingToCart({ isLoading: false });
      } catch (err) {
        throw new Error(`Failed to create guest order. Error: ${err}`);
      }
    }
  };

  // Get the right shop view -->
  const { category, subCategory, productId } = useParams();
  let shopView;

  if (category && subCategory === undefined) {
    shopView = <Category />;
  }
  if (subCategory && productId === undefined) {
    shopView =
      <SubCategory
        handleAddToCart={handleAddToCart}
        activeOrder={activeOrder}
        itemsInCart={itemsInCart}
        addingToCart={addingToCart}
      />;
  }
  if (productId) {
    shopView =
      <Product
        handleAddToCart={handleAddToCart}
        activeOrder={activeOrder}
        itemsInCart={itemsInCart}
        addingToCart={addingToCart}
      />;
  }

  return (

    <>
      <SectionSpacer dark spaceBelow />
      {
        shopView || <h4>Sorry - there's nothing here.  Please go back to the homepage and try again. </h4>
      }
      <SectionSpacer spaceBelow />
    </>

  );
};

export default Shop;
