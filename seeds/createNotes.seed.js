module.exports = async function createNotes(rapid) {
  const { User, Note } = rapid.models;

  const jim = await User.query()
    .where('username', 'jim')
    .first();
  const sarah = await User.query()
    .where('username', 'sarah')
    .first();

  return Note.query().insert([
    { authorId: jim.id, title: 'First note', content: 'Hello world!' },
    { authorId: sarah.id, title: 'Second note', content: 'Lorem ipsum' }
  ]);
};

module.exports.runOrder = 2;
