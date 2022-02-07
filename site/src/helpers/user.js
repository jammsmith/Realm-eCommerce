import { MongoDBRealmError } from 'realm-web';

export const registerEmailPassword = async (app, email, password) => {
  const handleAuthenticationError = (err) => {
    let message;

    const handleUnknownError = () => {
      message = 'Something went wrong, please refresh and try again';
    };

    if (err instanceof MongoDBRealmError) {
      const { error, statusCode } = err;
      const errorType = error || statusCode;
      switch (errorType) {
        case 'invalid username':
          message = 'Email address is invalid';
          break;
        case 'invalid username/password':
        case 'invalid password':
        case 401:
          message = 'Password is invalid';
          break;
        case 'name already in use':
        case 409:
          message = 'Email address is already registered';
          break;
        case 'password must be between 6 and 128 characters':
        case 400:
          message = 'Invalid password - must be between 6 and 128 characters';
          break;
        default: handleUnknownError();
          break;
      }
    } else {
      handleUnknownError();
    }
    return message;
  };

  let errorMessage;
  try {
    await app.emailPasswordAuth.registerUser(email, password);
  } catch (err) {
    errorMessage = handleAuthenticationError(err);
  }
  return { errorMessage };
};
