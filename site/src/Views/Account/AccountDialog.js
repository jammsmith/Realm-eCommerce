import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import uniqueString from 'unique-string';

// Components
import ActionButton from '../../Components/ActionButton.js';

// Hook / helpers etc
import { RealmAppContext } from '../../realmApolloClient.js';
import { registerEmailPassword } from '../../helpers/auth.js';
import mutations from '../../graphql/mutations.js';
import useDDMutation from '../../hooks/useDDMutation.js';
import { USER_DETAILED } from '../../graphql/queries.js';

const AccountDialog = ({ open, handleClose }) => {
  const app = useContext(RealmAppContext);
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState();
  const [addUser] = useDDMutation(mutations.AddUser);
  const [deleteUser] = useDDMutation(mutations.DeleteUser);
  const [getUserFromDb, { data: userQueryData }] = useLazyQuery(USER_DETAILED);

  useEffect(() => console.log('app.currentUser', app.currentUser), [app.currentUser]);

  // Event handlers
  const handleFormChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // TODO:
  // 1. fix order population in new user object
  //      a) get orders array in new user object to update properly
  //      b) update user_id in order to new user_id
  // 2. delete old realm guest user
  // 3. fix duplicate key error in addToCart
  const handleRegister = async () => {
    try {
      const { email, password } = formFields;
      const { error } = await registerEmailPassword(app, email, password);

      if (!error) {
        // If app.currentUser has been created as a guest user, save relevant details
        // to be duplicated into new user object
        const guestUser =
          app.currentUser && app.currentUser.orders && app.currentUser.orders.length &&
            {
              _id: app.currentUser._id,
              user_id: app.currentUser.user_id,
              orders: app.currentUser.orders.map(order => order.order_id)
            };

        // log user in, this will complete registration and create a new permenant user ID
        const userId = await app.logIn(email, password);

        // create new user, include 'orders' and 'user_id' from existing guest user if they exist
        let variables = {
          _id: userId,
          user_id: guestUser ? guestUser.user_id : `user-${await uniqueString()}`,
          email: email,
          type: 'customer'
        };
        if (guestUser) {
          variables = { ...variables, orders: guestUser.orders };
        }
        const { data } = await addUser({ variables });

        // set the current user to be the newly created user
        app.setCurrentUser(data.insertOneUser);

        // delete the old guest user from db
        await deleteUser({ variables: { id: guestUser._id } });

        // close the dialog
        handleClose();
      } else {
        setErrorMessage(error);
      }
    } catch (err) {
      console.log(`User registration failed. Error: ${err}`);
    }
  };

  const handleLogin = async () => {
    const { email, password } = formFields;
    const userId = await app.logIn(email, password);

    // look for user id in db.  if found set the current user, if not leave as is
    getUserFromDb({ variables: { id: userId } });
    if (userQueryData && userQueryData.user) {
      app.setCurrentUser(userQueryData.user);
    }
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register/login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Email Address'
            type='email'
            fullWidth
            variant='outlined'
            name='email'
            value={formFields.email}
            onChange={handleFormChange}
          />
          <TextField
            autoFocus
            margin='dense'
            label='Password'
            type='email'
            fullWidth
            variant='outlined'
            name='password'
            value={formFields.password}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', margin: '1rem' }}>
          <div>
            <ActionButton
              text='close'
              customStyles={{ marginRight: '0.25rem' }}
              onClick={handleClose}
            />
            <ActionButton
              text='register'
              onClick={handleRegister}
            />
          </div>
          <ActionButton
            text='login'
            onClick={handleLogin}
          />
        </DialogActions>
        <DialogContent>
          <DialogContentText>{errorMessage && `*${errorMessage}`}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

AccountDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AccountDialog;
