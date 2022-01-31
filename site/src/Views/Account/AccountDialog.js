import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from '@mui/material';
import { RealmAppContext } from '../../realmApolloClient.js';

const AccountDialog = ({ open, handleClose }) => {
  const app = useContext(RealmAppContext);
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });

  // Event handlers
  const handleFormChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    const { email, password } = formFields;
    await app.emailPasswordAuth.registerUser(email, password);
  };

  const handleLogin = async () => {
    const { email, password } = formFields;
    await app.logIn(email, password);
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
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AccountDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AccountDialog;
