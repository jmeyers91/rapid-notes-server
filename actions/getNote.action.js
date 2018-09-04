
module.exports = rapid => rapid.action(
  'getNote', 
  {
    type: 'object',
    required: [ 'noteId' ],
    properties: {
      noteId: { type: 'integer' },
    },
  }, 
  async ({ noteId }) => {
    const { Note } = rapid.models;

    const note = await Note.query()
      .eager('[author,attachments.file]')
      .where('id', noteId)
      .first();

    return note;
  },
);
