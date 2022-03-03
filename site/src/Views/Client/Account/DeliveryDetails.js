import React from 'react';
import PropTypes from 'prop-types';
import uniqueString from 'unique-string';

import AddressFormBasic from '../../../Components/AddressForms/AddressFormBasic.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';

// Styled components
import { Wrapper } from './StyledComponents.js';

const DeliveryDetails = ({ dbUser, updateDbUser }) => {
  const [createAddress] = useDDMutation(mutations.CreateAddress);
  const [updateAddress] = useDDMutation(mutations.UpdateAddress);
  const [updateUserAddresses] = useDDMutation(mutations.UpdateUserAddresses);

  const onAddressValid = async (fields) => {
    try {
      if (!dbUser.addresses || !dbUser.addresses.length) {
        const { data: addressData } = await createAddress({
          variables: {
            address_id: `address-${await uniqueString()}`,
            isDefault: !(dbUser.addresses && dbUser.addresses.length),
            ...fields
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

        updateDbUser(userData.updateOneUser);
      } else {
        const { data } = await updateAddress({
          variables: {
            address_id: fields.address_id,
            ...fields
          }
        });
        const update = data.updateOneAddress;
        const addressesClone = [...dbUser.addresses];
        const addressesLessUpdated = addressesClone.filter(address => address.address_id !== update.address_id);
        const updatedAddresses = [...addressesLessUpdated, update];

        updateDbUser({
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
        dbUser={dbUser}
        onAddressValid={onAddressValid}
        buttonText='save address'
        successMessage='Address saved'
      />
    </Wrapper>
  );
};

DeliveryDetails.propTypes = {
  dbUser: PropTypes.object.isRequired
};

export default DeliveryDetails;
