module.exports = rapid => {
  const { actions } = rapid;

  rapid.api.get('/note/:noteId/content', async context => {
    const { noteId } = context.params;

    context.response.body = {
      content: await actions.getNoteContent({ noteId })
    };
  });
};
