module.exports = rapid => {
  const { middleware, actions } = rapid;

  rapid.api.get(
    '/user',
    middleware.auth(),
    async context => {

      context.response.body = {
        user: await actions.getUserById({id: context.state.user.id}),
      };
    }
  );
};
