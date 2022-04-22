import React, { useContext } from 'react';

import PersonalDetails from './PersonalDetails.js';
import DeliveryDetails from './DeliveryDetails.js';
import MyOrders from './MyOrders.js';
import TabMenu from '../../../Components/TabMenu.js';
import { RealmAppContext } from '../../../realmApolloClient.js';

const MyAccount = () => {
  const app = useContext(RealmAppContext);
  const { dbUser } = app.currentUser;

  const updateDbUser = async (updatedUser) => {
    await app.setCurrentUser(user => ({
      ...user,
      dbUser: updatedUser
    }));
  };

  const sections = [
    {
      name: 'personal',
      label: 'Personal Details',
      component: <PersonalDetails dbUser={dbUser} updateDbUser={updateDbUser} />
    },
    {
      name: 'delivery',
      label: 'Delivery Details',
      component: <DeliveryDetails dbUser={dbUser} updateDbUser={updateDbUser} />
    },
    {
      name: 'orders',
      label: 'My Orders',
      component: <MyOrders dbUser={dbUser} />
    }
  ];

  return (
    <>
      <div style={{ minHeight: '500px' }}>
        <TabMenu items={sections} />
      </div>
    </>
  );
};

export default MyAccount;
