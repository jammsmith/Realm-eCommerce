export const registerEmailPassword = async (app, email, password) => {
  await app.emailPasswordAuth.registerUser({ email, password });
};
