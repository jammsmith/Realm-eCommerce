import React, { useState, useEffect, useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from '@mui/material';
import { RealmAppContext } from '../../realmApolloClient.js';

const AccountDialog = ({ dialogState }) => {
  const app = useContext(RealmAppContext);
  const [dialogOpen, setDialogOpen] = dialogState;
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });

  useEffect(() => setDialogOpen(true), [dialogState, setDialogOpen]);

  const handleCloseDialog = () => setDialogOpen(false);
  const handleFormChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRegisterAccount = async () => {
    const { email, password } = formFields;
    await app.emailPasswordAuth.registerUser(email, password);
  };
  const handleLoginEmailPassword = async () => {

  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Register an account</DialogTitle>
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
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button onClick={handleRegisterAccount}>Register</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountDialog;
