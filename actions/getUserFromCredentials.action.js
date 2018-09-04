module.exports = rapid =>
  rapid.action(
    'getUserFromCredentials',
    {
      type: 'object',
      required: [ 'username', 'password' ],
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
    async ({ username, password }) => {
      const { getUserByUsername } = rapid.actions;
      const { verifyPassword } = rapid.helpers;
      const user = await getUserByUsername({ username });

      if (user && (await verifyPassword(password, user.password))) {
        delete user.password;
        return user;
      }
      return null;
    },
  );
