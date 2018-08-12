module.exports = rapid =>
  rapid.action('getUserById', async ({ id }) => {
    const { User } = rapid.models;

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
