import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import uniqueString from 'unique-string';
import styled from 'styled-components';

import ActionButton from '../../../Components/ActionButton.js';
import TextInput from '../../../Components/Forms/TextInput.js';
import ErrorMessage from '../../../Components/ErrorMessage.js';
import { RealmAppContext } from '../../../realmApolloClient.js';
import { registerEmailPassword, getLoginError } from '../../../helpers/user.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';

// Styled components
const LoginWrapper = styled.div`
  border-radius: 5px;
  box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  padding: 1rem;
  margin: 1rem auto;
  -webkit-box-shadow: -3px -1px 10px 2px rgba(0,0,0,0.2);
  @media (min-width: 1024px) {
    width: 40%;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Login = () => {
  const app = useContext(RealmAppContext);
  const [formType, setFormType] = useState('login');
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState();

  const [addUser] = useDDMutation(mutations.AddUser);
  const [addUserWithOrders] = useDDMutation(mutations.AddUserWithOrders);
  const [deleteUser] = useDDMutation(mutations.DeleteUser);
  const history = useHistory();

  // Event handlers
  const handleFormChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    const { email, password, confirmPassword } = formFields;

    if (password !== confirmPassword) {
      setErrorMessage('Passwords don\'t match');
      return;
    }

    const { error: registerError } = await registerEmailPassword(app, email, password);

    if (!registerError) {
      // If app.currentUser has been created as a guest user, save relevant details
      // to be duplicated into new user object
      const guestUser =
          app.currentUser && app.currentUser.dbUser && app.currentUser.dbUser.orders && app.currentUser.dbUser.orders.length &&
            {
              _id: app.currentUser.dbUser._id,
              user_id: app.currentUser.dbUser.user_id,
              orders: app.currentUser.dbUser.orders.map(order => order.order_id)
            };

      // log user in, this will complete registration and create a new permenant user ID
      const { user, error: loginError } = await app.logIn(email, password);

      if (loginError) {
        const message = getLoginError(loginError);
        setErrorMessage(message);
        return;
      }

      // create new user, include 'orders' and 'user_id' from existing guest user if they exist
      const variables = {
        _id: user.id,
        user_id: guestUser ? guestUser.user_id : `user-${await uniqueString()}`,
        email: email,
        type: 'customer'
      };

      let newUser;
      if (guestUser) {
        const { data } = await addUserWithOrders({
          variables: {
            ...variables, orders: guestUser.orders
          }
        });
        newUser = data.insertOneUser;
        // delete the old guest user from db & anon user from realm
        await deleteUser({ variables: { id: guestUser._id } });
      } else {
        const { data } = await addUser({ variables });
        newUser = data.insertOneUser;
      }

      app.setCurrentUser({
        ...app.currentUser,
        dbUser: newUser
      });

      history.push('/my-account');
    } else {
      setErrorMessage(registerError);
    }
  };

  const handleLogin = async () => {
    const { error } = await app.logIn(formFields.email, formFields.password);
    if (!error) {
      history.push('/my-account');
    } else {
      const message = getLoginError(error);
      setErrorMessage(message);
    }
  };

  return (
    <LoginWrapper>
      <div>{formType === 'login' ? 'Login to your account' : 'Register an account'}</div>
      <div>
        <TextInput
          autoFocus
          label='Email Address'
          name='email'
          type='email'
          value={formFields.email}
          handleChange={handleFormChange}
        />
        <TextInput
          autoFocus
          label='Password'
          name='password'
          type='password'
          value={formFields.password}
          handleChange={handleFormChange}
        />
        {
          formType === 'register' &&
            <TextInput
              autoFocus
              label='Confirm password'
              name='confirmPassword'
              type='password'
              value={formFields.confirmPassword}
              handleChange={handleFormChange}
            />
        }
      </div>
      {
        formType === 'login'
          ? <ButtonsWrapper>
            <ActionButton
              text='login'
              onClick={handleLogin}
            />
            <ActionButton
              text='register new account'
              onClick={() => setFormType('register')}
            />
            </ButtonsWrapper>
          : <ButtonsWrapper>
            <ActionButton
              text='register'
              onClick={handleRegister}
            />
            <ActionButton
              text='login to your account'
              onClick={() => setFormType('login')}
            />
            </ButtonsWrapper>
      }
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </LoginWrapper>
  );
};

export default Login;
