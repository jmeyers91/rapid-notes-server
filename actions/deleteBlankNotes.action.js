
module.exports = rapid => rapid.action(
  'deleteBlankNotes', 
  {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: {type: 'integer'}
    }
  }, 
  async () => {
    const { Note } = rapid.models;
    await Note
      .query()
      .delete()
      .where('content', '')
      .andWhere('title', '');
  }
);
