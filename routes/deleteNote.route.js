module.exports = rapid => {
  const { middleware, actions } = rapid;

  rapid.api.delete(
    '/note/:noteId',
    middleware.auth(),
    async context => {
      const { noteId } = context.params;
      const userId = context.state.user.id;

      await actions.deleteNote({
        noteId,
        userId,
      });

      context.response.status = 200;
    }
  );
};
