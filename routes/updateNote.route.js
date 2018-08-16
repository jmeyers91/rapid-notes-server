module.exports = rapid => {
  const { middleware, actions } = rapid;

  rapid.api.post(
    '/note/:noteId',
    middleware.auth(),
    async context => {
      const { title, contentPatch, content, revision } = context.request.body;
      const { noteId } = context.params;

      await actions.updateNote({ title, contentPatch, content, noteId });
      context.response.body = {};
    }
  );
};
