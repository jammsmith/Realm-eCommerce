import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
import useCurrentRefId from '../../../hooks/useCurrentRefId.js';

const Shop = () => {
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [activeOrder, setActiveOrder] = useActiveOrder();

  // Set the next ref ID to be used as part of order mutations
  const currentRefIds = useCurrentRefId();
  const [nextDBCollectionRef, setNextDBCollectionRef] = useState({
    userRef: '',
    orderRef: '',
    orderItemRef: ''
  });
  const getNextRefId = (currentId) => {
    const sections = currentId.split('-');
    const next = Number(sections[1]) + 1;
    return `${sections[0]}-00${next}`;
  };
  useEffect(() => {
    if (
      currentRefIds &&
      currentRefIds.userRef &&
      currentRefIds.orderRef &&
      currentRefIds.orderItemRef &&
      !nextDBCollectionRef.userRef &&
      !nextDBCollectionRef.orderRef &&
      !nextDBCollectionRef.orderItemRef
    ) {
      setNextDBCollectionRef(() => {
        const userRef = getNextRefId(currentRefIds.userRef);
        const orderRef = getNextRefId(currentRefIds.orderRef);
        const orderItemRef = getNextRefId(currentRefIds.orderItemRef);
        return { userRef, orderRef, orderItemRef };
      });
    }
  }, [currentRefIds, nextDBCollectionRef]);

  // Get items currently in cart and send down to product tiles
  const [itemsInCart, setItemsInCart] = useState();
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
        await createNewOrderItem({
          variables: {
            orderItem_id: nextDBCollectionRef.orderItemRef,
            order_id: activeOrder.order_id,
            product_id: productId
          }
        });
        const orderItemIds = activeOrder.orderItems.map(item => item.orderItem_id);
        orderItemIds.push(nextDBCollectionRef.orderItemRef);
        const response = await updateOrderItemsInOrder({
          variables: {
            order_id: activeOrder.order_id,
            orderItems: orderItemIds
          }
        });
        setActiveOrder(response.data.updateOneOrder);
        setNextDBCollectionRef(prev => {
          const orderItemRef = getNextRefId(nextDBCollectionRef.orderItemRef);
          return { ...prev, orderItemRef };
        });
      } catch (err) {
        throw new Error(`Failed to add item to existing order. Error: ${err}`);
      }
    }

    // -- Current user with no active order -- //
    if (currentUser && currentUser.user_id && !activeOrder) {
      try {
        const response = await createOrderForExistingCustomer({
          variables: {
            order_id: nextDBCollectionRef.orderRef,
            user_id: currentUser.user_id,
            orderItem_id: nextDBCollectionRef.orderItemRef,
            product_id: productId
          }
        });
        const currentUserOrders =
          response.data.insertOneOrder.customer.orders.map(order => order.order_id);
        await updateUserOrders({
          variables: {
            user_id: currentUser.user_id,
            orders: [...currentUserOrders, nextDBCollectionRef.orderRef]
          }
        });
        setActiveOrder(response.data.insertOneOrder);
        setNextDBCollectionRef(prev => {
          const orderItemRef = getNextRefId(nextDBCollectionRef.orderItemRef);
          const orderRef = getNextRefId(nextDBCollectionRef.orderItemRef);
          return { ...prev, orderItemRef, orderRef };
        });
      } catch (err) {
        throw new Error(`Failed to add new order for existing customer. Error: ${err}`);
      }
    }

    // -- No current logged in user -- //
    if (currentUser && !currentUser.user_id) {
      try {
        const response = await createGuestOrder({
          variables: {
            order_id: nextDBCollectionRef.orderRef,
            user_ObjectId: currentUser.id,
            user_id: nextDBCollectionRef.userRef,
            orderItem_id: nextDBCollectionRef.orderItemRef,
            product_id: productId
          }
        });
        setActiveOrder(response.data.insertOneOrder.customer.orders[0]);
        setCurrentUser(response.data.insertOneOrder.customer);
        setNextDBCollectionRef(() => {
          const userRef = getNextRefId(nextDBCollectionRef.userRef);
          const orderItemRef = getNextRefId(nextDBCollectionRef.orderItemRef);
          const orderRef = getNextRefId(nextDBCollectionRef.orderRef);
          return { userRef, orderItemRef, orderRef };
        });
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
      />;
  }
  if (productId) {
    shopView =
      <Product
        handleAddToCart={handleAddToCart}
        activeOrder={activeOrder}
        itemsInCart={itemsInCart}
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
