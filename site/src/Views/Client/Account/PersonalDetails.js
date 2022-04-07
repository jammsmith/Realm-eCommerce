import React from 'react';
import PropTypes from 'prop-types';

import PersonalDetailsForm from '../../../Components/AddressForms/PersonalDetailsForm.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';

// Styled components
import { Wrapper } from './StyledComponents.js';

const PersonalDetails = ({ dbUser, updateDbUser }) => {
  const [updateUser] = useDDMutation(mutations.UpdateUser);

  const handleValidDetails = async (fields) => {
    const { data } = await updateUser({
      variables: {
        id: dbUser._id,
        ...fields
      }
    });
    await updateDbUser(data.updateOneUser);
  };

  return (
    <Wrapper>
      <PersonalDetailsForm
        dbUser={dbUser}
        onValidDetails={handleValidDetails}
        buttonText='confirm details'
        successMessage='Details saved'
      />
    </Wrapper>
  );
};

PersonalDetails.propTypes = {
  dbUser: PropTypes.object.isRequired
};

export default PersonalDetails;
