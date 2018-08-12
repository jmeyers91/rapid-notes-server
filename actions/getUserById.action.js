module.exports = rapid =>
  rapid.action('getUserById', async ({ id }) => {
    const { actions } = rapid;
    const { User } = rapid.models;
    await actions.deleteBlankNotes({ userId: id });
    return User.query()
      .where('id', id)
      .eager('notes(noteQuery)', {
        noteQuery(query) {
          return query
            .select('id', 'createdAt', 'updatedAt', 'title')
            .orderBy('createdAt', 'desc');
        }
      })
      .first();
  });
