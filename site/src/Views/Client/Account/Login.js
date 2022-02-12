import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import uniqueString from 'unique-string';
import styled from 'styled-components';

import ActionButton from '../../../Components/ActionButton.js';
import TextInput from '../../../Components/Forms/TextInput.js';
import { RealmAppContext } from '../../../realmApolloClient.js';
import { registerEmailPassword } from '../../../helpers/user.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';
import { USER_DETAILED } from '../../../graphql/queries.js';

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
  margin-top: 1rem;
`;

const Login = () => {
  const app = useContext(RealmAppContext);
  const history = useHistory();
  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState();
  const [addUser] = useDDMutation(mutations.AddUser);
  const [deleteUser] = useDDMutation(mutations.DeleteUser);
  const [getUserFromDb, { error, loading, data }] = useLazyQuery(USER_DETAILED);
  const [shouldLogin, setShouldLogin] = useState(false);

  // Event handlers
  const handleFormChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      } else {
        setErrorMessage(error);
      }
    } catch (err) {
      throw new Error(`Failed to register a new user. Error: ${err}`);
    }
  };

  // Log user in to app and create user object with realm user and db user
  const handleLogin = useCallback(async () => {
    try {
      const userId = await app.logIn(formFields.email, formFields.password);
      getUserFromDb({ variables: { id: userId } });

      return dbUser => {
        if (!dbUser) return;
        app.setCurrentUser({ realmUser: app.currentUser, dbUser });
        history.push('/my-account');
      };
    } catch (err) {
      throw new Error('Failed to log user in. Error:', err);
    }
  }, [app, formFields, getUserFromDb, history]);

  const setLoggedInUser = useRef();

  useEffect(() => {
    const handleAsyncLogin = async () => {
      if (!error && !loading && !data && shouldLogin) {
        setLoggedInUser.current = await handleLogin();
      }
      if (shouldLogin && typeof setLoggedInUser.current === 'function' && data?.user) {
        setLoggedInUser.current(data.user);
      }
    };
    handleAsyncLogin();
  }, [shouldLogin, handleLogin, data, loading, error]);

  return (
    <LoginWrapper>
      <div>Login or register an account</div>
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
      </div>
      <ButtonsWrapper>
        <ActionButton
          text='register'
          onClick={handleRegister}
        />
        <ActionButton
          text='login'
          onClick={() => setShouldLogin(true)}
        />
      </ButtonsWrapper>
      <div>{errorMessage && `*${errorMessage}`}</div>
    </LoginWrapper>
  );
};

export default Login;
