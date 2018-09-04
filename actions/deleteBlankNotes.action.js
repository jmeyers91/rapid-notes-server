
module.exports = rapid => rapid.action(
  'deleteBlankNotes', 
  {
    type: 'object',
    required: [ 'userId' ],
    properties: {
      userId: { type: 'integer' },
    },
  }, 
  async ({ userId }) => {
    const { Note } = rapid.models;
    await Note
      .query()
      .delete()
      .where('content', '')
      .andWhere('title', '')
      .andWhere('authorId', userId);
  },
);
