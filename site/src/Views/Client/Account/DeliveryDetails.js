import React from 'react';
import PropTypes from 'prop-types';

import AddressFormBasic from '../../../Components/AddressForms/AddressFormBasic.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';
import { getDefaultAddress } from '../../../helpers/address.js';

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
            ...fields,
            isDefault: !(dbUser.addresses && dbUser.addresses.length)
          }
        });
        const { data: userData } = await updateUserAddresses({
          variables: {
            id: dbUser._id,
            addresses: [addressData.insertOneAddress.address_id]
          }
        });

        await updateDbUser(userData.updateOneUser);
      } else {
        const { data } = await updateAddress({
          variables: fields
        });
        const update = data.updateOneAddress;
        const addressListClone = [...dbUser.addresses];
        const addressListLessUpdated = addressListClone.filter(address => address.address_id !== update.address_id);
        const updatedAddressList = [...addressListLessUpdated, update];

        await updateDbUser({
          ...dbUser,
          addresses: updatedAddressList
        });
      }
    } catch (err) {
      throw new Error('Failed to save address. Error:', err);
    }
  };

  return (
    <Wrapper width='100%'>
      <AddressFormBasic
        onAddressValid={onAddressValid}
        buttonText='save address'
        successMessage='Address saved'
        defaultAddress={getDefaultAddress(dbUser.addresses)}
      />
    </Wrapper>
  );
};

DeliveryDetails.propTypes = {
  dbUser: PropTypes.object.isRequired
};

export default DeliveryDetails;
