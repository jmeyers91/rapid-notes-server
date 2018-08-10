module.exports = rapid =>
  rapid.action(
    'getUserByUsername',
    {
      type: 'object',
      required: ['username'],
      properties: {
        username: { type: 'string' }
      }
    },
    async ({ username }) => {
      const { User } = rapid.models;

      return User.query()
        .where('username', username)
        .first();
    }
  );
