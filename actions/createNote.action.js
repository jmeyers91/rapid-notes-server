
module.exports = rapid => rapid.action(
  'createNote', 
  {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: {type: 'integer'}
    }
  }, 
  async ({ userId : authorId }) => {
    const { Note } = rapid.models;

    const title = '';
    const content = '';
    const note = await Note.query().insert({ authorId, title, content }).returning('*');

    return note;
  }
);
