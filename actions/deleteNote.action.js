
module.exports = rapid => rapid.action(
  'deleteNote', 
  {
    type: 'object',
    required: ['userId', 'noteId'],
    properties: {
      userId: {type: 'integer'},
      noteId: {type: 'integer'},
    }
  }, 
  async ({ noteId, userId }) => {
    const { Note } = rapid.models;

    await Note
      .query()
      .delete()
      .first()
      .where({ 
        id: noteId,
        authorId: userId
      });
  }
);
