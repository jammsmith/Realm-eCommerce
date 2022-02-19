import React, { useContext, useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';

import AccountTile from '../../../Components/Tiles/AccountTile.js';
import SectionSpacer from '../../../Components/SectionSpacer.js';
import { RealmAppContext } from '../../../realmApolloClient.js';
import { DELIVERY_BY_ID } from '../../../graphql/queries.js';

// Styled components
const OuterContainer = styled.div`
  margin: 1rem;
`;

const Tiles = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  @media (min-width: 1024px) {
    justify-content: space-between;
    width: 850px;
    margin: auto
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5rem;
  flex-wrap: wrap;
`;

const MyAccount = () => {
  const app = useContext(RealmAppContext);

  const [address, setAddress] = useState();
  const [orders, setOrders] = useState();
  const [quotes, setQuotes] = useState();

  const [getAddress] = useLazyQuery(DELIVERY_BY_ID, {
    onCompleted: ({ delivery }) => {
      console.log('delivery', delivery);
      setAddress(delivery);
    }
  });

  useEffect(() => {
    if (app && app.currentUser && app.currentUser.dbUser && app.currentUser.dbUser.orders) {
      const successfulOrder = app.currentUser.dbUser.orders.find(order => order.paymentStatus === 'successful');
      if (successfulOrder) {
        getAddress({ variables: { delivery_id: successfulOrder.delivery } });
      }
    }
  }, [app.currentUser]);

  return (
    <>
      <SectionSpacer dark />
      <OuterContainer>
        <Tiles>
          <AccountTile heading='My details'>
            <Row>
              <p>Name</p>
              <p>some name</p>
            </Row>
            <Row>
              <p>Name</p>
              <p>some name</p>
            </Row>
            <Row>
              <p>Name</p>
              <p>some name</p>
            </Row>
            <Row>
              <p>Name</p>
              <p>some name</p>
            </Row>
          </AccountTile>
          <AccountTile heading='My orders'>
        some content
          </AccountTile>
          <AccountTile heading='My quotes'>
        some content
          </AccountTile>
        </Tiles>
      </OuterContainer>
    </>
  );
};

export default MyAccount;
