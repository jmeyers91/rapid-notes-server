module.exports = rapid => {
  const { middleware, actions } = rapid;

  return rapid.api.post(
    '/login',
    middleware.login(actions.getUserFromCredentials),
    context => {
      context.response.body = {
        authToken: context.state.authToken,
        user: context.state.user,
      };
    }
  );
};
