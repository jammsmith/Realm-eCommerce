import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import AddressFormBasic from '../../../../Components/AddressForms/AddressFormBasic.js';
import PersonalDetailsForm from '../../../../Components/AddressForms/PersonalDetailsForm.js';
import Heading from '../../../../Components/Headings/Heading.js';
import { getDefaultAddress } from '../../../../helpers/address.js';
import { isAuthenticated } from '../../../../helpers/auth.js';
import { getUpdatedObjectFields } from '../../../../helpers/global.js';
import { RealmAppContext } from '../../../../realmApolloClient.js';
import mutations from '../../../../graphql/mutations.js';
import useDDMutation from '../../../../hooks/useDDMutation.js';

// Styled components
import { CheckoutItem } from './StyledComponents.js';

const DeliveryForm = ({
  updateDeliveryDetails,
  updateCheckoutCompletion,
  willCustomerPickUpInStore
}) => {
  const { currentUser, setCurrentUser } = useContext(RealmAppContext);

  const [updateUser] = useDDMutation(mutations.UpdateUser);

  const personalRequiredFields = ['firstName', 'lastName', 'email'];
  const defaultAddress = getDefaultAddress(currentUser.dbUser.addresses);

  const handleValidDetails = useCallback(async (fields, formType) => {
    updateDeliveryDetails(fields);
    if (formType) {
      updateCheckoutCompletion({ [`${formType}FormComplete`]: true });
    }

    // if logged in user then update details if any have changed
    if (isAuthenticated(currentUser)) {
      const { updatedFields, hasUpdatedFields } = getUpdatedObjectFields(currentUser.dbUser, fields);

      if (formType === 'personal' && hasUpdatedFields) {
        const { data } = await updateUser({
          variables: {
            id: currentUser.dbUser._id,
            ...updatedFields
          }
        });
        await setCurrentUser(user => ({
          ...user,
          dbUser: data.updateOneUser
        }));
      }
    }
  }, [updateDeliveryDetails, updateCheckoutCompletion, currentUser, updateUser, setCurrentUser]);

  const handleEditDetails = useCallback((formType) => {
    updateCheckoutCompletion({ [`${formType}FormComplete`]: false });
  }, [updateCheckoutCompletion]);

  const handlePickUpInStore = (willPickUp) => {
    willCustomerPickUpInStore.current = willPickUp;
    updateCheckoutCompletion({ deliveryFormComplete: !!willPickUp });
  };

  return (
    <div>
      <CheckoutItem>
        <Heading text='Your details' size='small' />
        <PersonalDetailsForm
          dbUser={currentUser.dbUser}
          onValidDetails={handleValidDetails}
          onEditting={handleEditDetails}
          buttonText='confirm details'
          successMessage='Personal details confirmed'
          disableOnComplete
          requiredFields={personalRequiredFields}
          isCheckoutForm
        />
      </CheckoutItem>
      <CheckoutItem>
        <Heading text='Delivery details' size='small' />
        <AddressFormBasic
          onAddressValid={handleValidDetails}
          onEditting={handleEditDetails}
          onPickUpInStore={handlePickUpInStore}
          buttonText='confirm address'
          successMessage='Address confirmed'
          disableOnComplete
          defaultAddress={defaultAddress}
          isCheckoutForm
        />
      </CheckoutItem>
    </div>
  );
};

DeliveryForm.propTypes = {
  updateDeliveryDetails: PropTypes.func.isRequired,
  updateCheckoutCompletion: PropTypes.func.isRequired,
  willCustomerPickUpInStore: PropTypes.object.isRequired
};

export default DeliveryForm;
