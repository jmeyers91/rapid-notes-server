module.exports = rapid => {
  const { middleware, actions } = rapid;

  rapid.api.post(
    '/note/:noteId',
    middleware.auth(),
    async context => {
      const { title, contentPatch } = context.request.body;
      const { noteId } = context.params;

      await actions.updateNote({ title, contentPatch, noteId });
      context.response.body = {};
    }
  );
};
