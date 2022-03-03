import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import uniqueString from 'unique-string';

import AddressFormBasic from '../../../Components/AddressForms/AddressFormBasic.js';
import Heading from '../../../Components/Heading.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';
import { ADDRESSES_BY_ID } from '../../../graphql/queries.js';

// Styled components
import { Wrapper, SavedAddress } from './StyledComponents.js';

const DeliveryDetails = ({ dbUser, updateCurrentUser }) => {
  console.log('DeliveryDetails renders');
  console.log('dbUser.addresses on render', dbUser.addresses);
  const [address, setAddress] = useState();
  const [createNew, setCreateNew] = useState(false);

  const [createAddress] = useDDMutation(mutations.CreateAddress);
  const [updateAddress] = useDDMutation(mutations.UpdateAddress);
  const [updateUserAddresses] = useDDMutation(mutations.UpdateUserAddresses);

  const addressIds = dbUser.addresses && dbUser.addresses.map(address => address.address_id);

  const { data } = useQuery(ADDRESSES_BY_ID, {
    variables: { addressIds },
    skip: !addressIds,
    onCompleted: (data) => console.log('ADDRESSES_BY_ID data', data)
  });

  useEffect(() => {
    if (data && data.addresses && data.addresses.length) {
      const defaultAddress = data.addresses.find(addr => addr.isDefault === true);
      console.log('defaultAddress', defaultAddress);
      if (address !== defaultAddress) {
        console.log('setting address');
        setAddress(defaultAddress);
      }
    }
  }, [data, address]);

  const onSubmitSuccess = async (addressFields) => {
    console.log('onSubmitSuccess fired');
    const { _id, ...other } = addressFields;
    console.log('other in onSubmitSuccess', other);
    if (!createNew && address) {
      console.log('!createNew && address');
      await updateAddress({
        variables: {
          address_id: address.address_id,
          ...address
        }
      });
    } else {
      const { data: addressData } = await createAddress({
        variables: {
          address_id: `address-${await uniqueString()}`,
          isDefault: !(dbUser.addresses && dbUser.addresses.length),
          ...other
        }
      });
      console.log('addressData.insertOneAddress', addressData.insertOneAddress);
      setAddress(addressData.insertOneAddress);
      const { data: userData } = await updateUserAddresses({
        variables: {
          user_id: dbUser.user_id,
          addresses: dbUser.addresses
            ? [...dbUser.addresses, addressData.insertOneAddress.address_id]
            : [addressData.insertOneAddress.address_id]
        }
      });
      console.log('userData.updateOneUser before updateCurrentUser', userData.updateOneUser);
      updateCurrentUser(userData.updateOneUser);
    }
    console.log('onSubmitSuccess end');
  };

  return (
    <Wrapper>
      <SavedAddress>
        <Heading text='Saved Address' size='small' />
        <div>
          {dbUser.address ? dbUser.address : 'We don\'t have a saved address for you yet'}
        </div>
      </SavedAddress>
      <AddressFormBasic
        onSubmitSuccess={onSubmitSuccess}
        address={address}
      />
    </Wrapper>
  );
};

DeliveryDetails.propTypes = {
  dbUser: PropTypes.object.isRequired
};

export default DeliveryDetails;
