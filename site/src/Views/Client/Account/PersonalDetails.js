import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import PersonalDetailsForm from '../../../Components/AddressForms/PersonalDetailsForm.js';
import ActionButton from '../../../Components/ActionButton.js';
import UserMessage from '../../../Components/UserMessage.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';
import useBreakpoints from '../../../hooks/useBreakpoints.js';
import { RealmAppContext } from '../../../realmApolloClient.js';

// Styled components
import { Wrapper } from './StyledComponents.js';

const PersonalDetails = ({ dbUser, updateDbUser }) => {
  const app = useContext(RealmAppContext);

  const [message, setMessage] = useState(null);

  const [updateUser] = useDDMutation(mutations.UpdateUser);
  const { isXs, isSm } = useBreakpoints();

  const handleValidDetails = async (fields) => {
    const { data } = await updateUser({
      variables: {
        id: dbUser._id,
        ...fields
      }
    });
    await updateDbUser(data.updateOneUser);
  };

  const handleResetPasswordRequest = async () => {
    try {
      const email = app.currentUser.dbUser.email;
      await app.emailPasswordAuth.sendResetPasswordEmail({ email });
      setMessage({ type: 'success', text: `An email has been sent to ${email}.  Please click on the link in this email to reset your password.` });
    } catch (err) {
      setMessage('Failed to send password reset email.  Try refreshing and trying again or please contact Doves and Dandys');
    }
  };

  return (
    <Wrapper width={isXs || isSm ? '100%' : null}>
      <PersonalDetailsForm
        dbUser={dbUser}
        onValidDetails={handleValidDetails}
        buttonText='confirm details'
        successMessage='Details saved'
      />
      <ActionButton
        text='Reset password'
        onClick={handleResetPasswordRequest}
        customStyles={{ marginTop: '2rem' }}
      />
      {message && <UserMessage text={message.text} type={message.type} />}
    </Wrapper>
  );
};

PersonalDetails.propTypes = {
  dbUser: PropTypes.object.isRequired,
  updateDbUser: PropTypes.func.isRequired
};

export default PersonalDetails;
