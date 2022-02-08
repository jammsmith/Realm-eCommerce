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

import ActionButton from '../../Components/ActionButton.js';
import { RealmAppContext } from '../../realmApolloClient.js';
import { registerEmailPassword } from '../../helpers/user.js';
import mutations from '../../graphql/mutations.js';
import useDDMutation from '../../hooks/useDDMutation.js';
import { USER_DETAILED } from '../../graphql/queries.js';

const LoginDialog = ({ open, handleClose }) => {
  const app = useContext(RealmAppContext);
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState();
  const [addUser] = useDDMutation(mutations.AddUser);
  const [deleteUser] = useDDMutation(mutations.DeleteUser);
  const [getUserFromDb, { loading, error, data }] = useLazyQuery(USER_DETAILED);

  const { dbUser, realmAppUser } = app.currentUser;

  useEffect(() => {
    if (error) {
      throw new Error('Failed to find user in database');
    }
    if (data && data.user) {
      app.setCurrentUser({
        realmUser: app.currentUser,
        dbUser: data.user
      });
      handleClose();
    }
  }, [app, handleClose, loading, error, data]);

  // Event handlers
  const handleFormChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // TODO: delete old realm guest user once registered with a new permanent account
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

        app.setCurrentUser({
          realmUser: app.currentUser,
          dbUser: data.insertOneUser
        });

        // delete the old guest user from db & anon user from realm
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
    const userId = await app.logIn(formFields.email, formFields.password);

    // look for user id in db.  This gets handled in useEffect which is fired on loading/error/data
    getUserFromDb({ variables: { id: userId } });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login or register an account</DialogTitle>
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

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default LoginDialog;
