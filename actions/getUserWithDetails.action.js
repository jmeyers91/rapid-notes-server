module.exports = rapid =>
  rapid.action(
    'getUserById', 
    {
      type: 'object',
      required: [ 'id' ],
      properties: {
        id: { type: 'integer' },
      },
    },
    async ({ id }) => {
      const { actions } = rapid;
      const { User } = rapid.models;
      await actions.deleteBlankNotes({ userId: id });
      return User.query()
        .where('id', id)
        .eager('[notes(noteQuery), notebooks]', {
          noteQuery(query) {
            return query
              .select('id', 'createdAt', 'updatedAt', 'title', 'notebookId', 'authorId', 'revision')
              .orderBy('createdAt', 'desc');
          }
        })
        .first();
    },
  );
