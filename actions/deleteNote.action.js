
module.exports = rapid => rapid.action(
  'deleteNote', 
  {
    type: 'object',
    required: [ 'userId', 'noteId' ],
    properties: {
      userId: { type: 'integer' },
      noteId: { type: 'integer' },
    },
  }, 
  async ({ noteId, userId }) => {
    const { deleteFiles } = rapid.actions;
    const { Note } = rapid.models;
    const note = await Note.query()
      .where({
        id: noteId,
        authorId: userId
      })
      .eager('attachments.file')
      .first();
    
    const fileIds = note.attachments.map(attachment => attachment.file.id);
    if(fileIds.length) {
      await deleteFiles({
        userId,
        fileIds,
      });
    }

    await Note
      .query()
      .delete()
      .first()
      .where({ 
        id: noteId,
        authorId: userId
      });
  },
);
