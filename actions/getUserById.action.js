module.exports = rapid =>
  rapid.action('getUserById', async () => {
    const { User } = rapid.models;

    return User.query()
      .where('id', id)
      .first();
  });
