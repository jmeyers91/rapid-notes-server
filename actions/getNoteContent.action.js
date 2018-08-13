
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

    require('fs').writeFile('./content.json', JSON.stringify({content: note.content}, null, 2));

    return note.content;
  }
);
