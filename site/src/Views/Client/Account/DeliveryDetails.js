import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uniqueString from 'unique-string';

import AddressFormBasic from '../../../Components/AddressForms/AddressFormBasic.js';
import { formatUserDetails } from '../../../helpers/user.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';

// Styled components
import { Wrapper } from './StyledComponents.js';

const DeliveryDetails = ({ dbUser, updateCurrentUser }) => {
  const [address, setAddress] = useState();
  const [createNew, setCreateNew] = useState(false);

  const [createAddress] = useDDMutation(mutations.CreateAddress);
  const [updateAddress] = useDDMutation(mutations.UpdateAddress);
  const [updateUserAddresses] = useDDMutation(mutations.UpdateUserAddresses);

  useEffect(() => {
    if (dbUser.addresses && dbUser.addresses.length) {
      const defaultAddress = dbUser.addresses.find(addr => addr.isDefault === true);
      if (address !== defaultAddress) {
        setAddress(defaultAddress);
      }
    }
  }, [dbUser, address]);

  const onAddressValid = async (addressFields) => {
    try {
      const formattedFields = formatUserDetails(addressFields);

      if (createNew || !address) {
        const { data: addressData } = await createAddress({
          variables: {
            address_id: `address-${await uniqueString()}`,
            isDefault: !(dbUser.addresses && dbUser.addresses.length),
            ...formattedFields
          }
        });

        const { data: userData } = await updateUserAddresses({
          variables: {
            user_id: dbUser.user_id,
            addresses: dbUser.addresses
              ? [...dbUser.addresses, addressData.insertOneAddress.address_id]
              : [addressData.insertOneAddress.address_id]
          }
        });

        updateCurrentUser(userData.updateOneUser);
      } else {
        const { data } = await updateAddress({
          variables: {
            address_id: addressFields.address_id,
            ...formattedFields
          }
        });

        const update = data.updateOneAddress;
        const addressesClone = [...dbUser.addresses];
        const addressesLessUpdated = addressesClone.filter(address => address.address_id !== update.address_id);
        const updatedAddresses = [...addressesLessUpdated, update];

        updateCurrentUser({
          ...dbUser,
          addresses: updatedAddresses
        });
      }
    } catch (err) {
      throw new Error('Failed to save address. Error:', err);
    }
  };

  return (
    <Wrapper>
      <AddressFormBasic
        onAddressValid={onAddressValid}
        address={address}
      />
    </Wrapper>
  );
};

DeliveryDetails.propTypes = {
  dbUser: PropTypes.object.isRequired
};

export default DeliveryDetails;
