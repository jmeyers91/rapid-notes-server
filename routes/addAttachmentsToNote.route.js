module.exports = rapid => {
  const { middleware, actions } = rapid;

  rapid.api.post(
    '/note/:noteId/attach',
    middleware.auth(),
    async context => {
      const { noteId } = context.params;
      const { files } = context.request.body;
      const userId = context.state.user.id;
      const attachments = await actions.addAttachmentsToNote({
        userId,
        noteId,
        files,
      });

      context.response.body = { attachments };
    }
  );
};
