module.exports = rapid =>
  rapid.action('getUserById', async ({ id }) => {
    const { User } = rapid.models;

    return User.query()
      .where('id', id)
      .eager('notes(withoutContent)', {
        withoutContent(query) {
          return query.select('id', 'createdAt', 'updatedAt', 'title');
        },

        onlyAFew(query) {
          return query.limit(10);
        }
      })
      .first();
  });
