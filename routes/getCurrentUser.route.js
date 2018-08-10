module.exports = rapid => {
  const { middleware } = rapid;

  rapid.api.get(
    '/user',
    middleware.auth(),
    context => {
      context.response.body = {
        user: context.state.user,
      };
    }
  );
};
