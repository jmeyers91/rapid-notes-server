module.exports = rapid =>
  rapid.action(
    'getUsers', 
    async () => {
      const { User } = rapid.models;
      return User.query();
    },
  );
