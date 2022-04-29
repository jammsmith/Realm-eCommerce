import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import uniqueString from 'unique-string';
import styled from 'styled-components';

import ActionButton from '../../../Components/ActionButton.js';
import TextInput from '../../../Components/Forms/TextInput.js';
import UserMessage from '../../../Components/UserMessage.js';
import { RealmAppContext } from '../../../realmApolloClient.js';
import { registerEmailPassword, getLoginError, isAuthenticated } from '../../../helpers/auth.js';
import mutations from '../../../graphql/mutations.js';
import useDDMutation from '../../../hooks/useDDMutation.js';
import colours from '../../../styles/colours.js';

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

const Login = ({ form }) => {
  const app = useContext(RealmAppContext);
  const { dbUser } = app.currentUser;

  const [formType, setFormType] = useState(form || 'login');
  const [formFields, setFormFields] = useState({
    email: dbUser && dbUser.email ? dbUser.email : '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState();

  const [addUser] = useDDMutation(mutations.AddUser);
  const [addUserWithOrders] = useDDMutation(mutations.AddUserWithOrders);
  const [updateUserAddresses] = useDDMutation(mutations.UpdateUserAddresses);
  const [deleteUser] = useDDMutation(mutations.DeleteUser);

  const history = useHistory();

  // Event handlers
  const handleFormChange = (e) => {
    setFormFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await app.logIn(formFields.email, formFields.password);

    if (!error) {
      history.push('/my-account');
    } else {
      const message = getLoginError(error);
      setErrorMessage(message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formFields;

    if (password !== confirmPassword) {
      setErrorMessage('Passwords don\'t match');
      return;
    }

    try {
      const { error: registerError } = await registerEmailPassword(app, email, password);

      if (!registerError) {
        // If app.currentUser has been created as a guest user, save relevant details
        // to be duplicated into new user object
        const guestUser =
            dbUser.orders && dbUser.orders.length &&
              {
                _id: dbUser._id,
                user_id: dbUser.user_id,
                firstName: dbUser.firstName || '',
                lastName: dbUser.lastName || '',
                phone: dbUser.phone || '',
                orders: dbUser.orders.map(order => order.order_id),
                addresses: dbUser.addresses.map(address => address.address_id)
              };
        // log user in, this will complete registration and create a new permenant user ID
        const { user, error: loginError } = await app.logIn(email, password);

        if (loginError) {
          const message = getLoginError(loginError);
          setErrorMessage(message);
          return;
        }

        // create new user, keep existing data if it exists
        const standardVars = {
          _id: user.id,
          user_id: guestUser ? guestUser.user_id : `user-${await uniqueString()}`,
          email: email,
          type: 'customer'
        };

        let guestUserVars;
        if (guestUser) {
          console.log('is guest user');
          guestUserVars = {
            ...standardVars,
            firstName: guestUser.firstName,
            lastName: guestUser.lastName,
            phone: guestUser.phone
          };
        }

        let newUser;

        if (guestUser) {
          const { data: addUserWithOrdersData } = await addUserWithOrders({
            variables: {
              ...guestUserVars, orders: guestUser.orders
            }
          });

          if (guestUser.addresses && guestUser.addresses.length) {
            const { data: updateUserAddressesData } = await updateUserAddresses({
              variables: {
                id: user.id,
                addresses: guestUser.addresses
              }
            });

            newUser = updateUserAddressesData.updateOneUser;
          } else {
            newUser = addUserWithOrdersData.insertOneUser;
          }

          // delete the old guest user from db & anon user from realm
          await deleteUser({ variables: { id: guestUser._id } });
        } else {
          const { data: addUserData } = await addUser({ variables: standardVars });
          newUser = addUserData.insertOneUser;
        }

        await app.setCurrentUser(user => ({
          ...user,
          dbUser: newUser
        }));
        history.push('/my-account');
      } else {
        setErrorMessage(registerError);
      }
    } catch (err) {
      throw new Error('Failed to register user. Error:', err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated(app.currentUser)) {
      history.push('/my-account');
    }
    if (formType !== form) {
      setFormType(form);
    }
  }, [formType, form, app.currentUser, history]);

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
          label='Password'
          name='password'
          type='password'
          value={formFields.password}
          handleChange={handleFormChange}
        />
        {
          formType === 'register' &&
            <TextInput
              label='Confirm password'
              name='confirmPassword'
              type='password'
              value={formFields.confirmPassword}
              handleChange={handleFormChange}
            />
        }
      </div>
      {
        formType === 'login' ? (
          <ButtonsWrapper>
            <ActionButton
              text='register new account'
              onClick={() => setFormType('register')}
            />
            <ActionButton
              text='login'
              onClick={handleLogin}
              customStyles={{ borderWidth: '0.15rem', borderColor: colours.dark }}
            />
          </ButtonsWrapper>
        ) : (
          <ButtonsWrapper>
            <ActionButton
              text='login to your account'
              onClick={() => setFormType('login')}
            />
            <ActionButton
              text='register'
              onClick={handleRegister}
              customStyles={{ borderWidth: '0.15rem', borderColor: colours.dark }}
            />
          </ButtonsWrapper>
        )
      }
      {errorMessage && <UserMessage text={errorMessage} type='error' />}
    </LoginWrapper>
  );
};

Login.propTypes = {
  form: PropTypes.string
};

export default Login;
