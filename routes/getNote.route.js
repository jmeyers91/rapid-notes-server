module.exports = rapid => {
  const { actions } = rapid;

  rapid.api.get('/note/:noteId', async context => {
    const { noteId } = context.params;

    context.response.body = {
      note: await actions.getNote({ noteId })
    };
  });
};
