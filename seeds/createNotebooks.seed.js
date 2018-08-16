module.exports = async function createNotebooks(rapid) {
  const faker = require('faker');
  const range = require('lodash/range');
  const sample = require('lodash/sample');
  const { User, Note, Notebook } = rapid.models;
  const fakeNotebookCount = 5; // per user

  for(let user of await User.query()) {
    const notebooks = await Notebook.query().returning('*').insert(
      range(fakeNotebookCount).map(i => ({
        name: 'Notebook ' + faker.lorem.words(),
        ownerId: user.id,
      }))
    );
    notebooks.push(null, null, null, null, null); // a lot of notes won't be in a notebook

    for(let note of await Note.query().where('authorId', user.id)) {
      const notebook = sample(notebooks);
      const notebookId = notebook ? notebook.id : null;
      await Note.query().patch({notebookId}).where('id', note.id).first();
    }
  }
};

module.exports.runOrder = 3;
