
module.exports = rapid => rapid.action(
  'getNoteContent', 
  {
    type: 'object',
    required: ['noteId'],
    properties: {
      noteId: {type: 'integer'}
    }
  }, 
  async ({ noteId }) => {
    const { Note } = rapid.models;

    const note = await Note.query()
      .select('content')
      .where('id', noteId)
      .first();

    return note.content;
  }
);
