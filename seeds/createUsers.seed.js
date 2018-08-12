module.exports = async function createUsers(rapid) {
  const { User } = rapid.models;
  const { hashPassword } = rapid.helpers;

  return User.query().insert([
    {
      email: 'jim@test.com',
      password: await hashPassword('secret')
    },
    {
      email: 'sarah@test.com',
      password: await hashPassword('pineapple')
    }
  ]);
};

module.exports.runOrder = 1;
