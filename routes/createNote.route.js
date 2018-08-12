module.exports = rapid => {
  const { middleware, actions } = rapid;

  rapid.api.post(
    '/note',
    middleware.auth(),
    async context => {
      const userId = context.state.user.id;
      context.response.body = {
        note: await actions.createNote({ userId })
      };
    }
  );
};
