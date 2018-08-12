module.exports = async function createNotes(rapid) {
  const faker = require('faker');
  const range = require('lodash/range');
  const { User, Note } = rapid.models;
  const fakeNoteCount = 800; // per user

  const jim = await User.query()
    .where('email', 'jim@test.com')
    .first();
  const sarah = await User.query()
    .where('email', 'sarah@test.com')
    .first();

  await Note.query().insert([
    { authorId: jim.id, title: 'First note', content: 'Hello world!' },
    { authorId: sarah.id, title: 'Second note', content: 'Lorem ipsum' }
  ]);

  for(let user of await User.query()) {
    await Note.query().insert(
      range(fakeNoteCount).map(i => ({
        authorId: user.id,
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs()
      }))
    );
  }
};

module.exports.runOrder = 2;
