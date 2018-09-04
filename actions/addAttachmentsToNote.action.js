
module.exports = rapid => rapid.action(
  'addAttachmentsToNote', 
  {
    type: 'object',
    required: [ 'userId', 'noteId', 'files' ],
    properties: {
      userId: { type: 'integer' },
      noteId: { type: 'integer' },
      files: {
        type: 'array',
        items: { type: 'object', required: [ 'id' ] },
      },
    },
  }, 
  async ({ userId, noteId, files }) => {
    const { models } = rapid;
    const { Note, NoteAttachment } = models;

    const note = Note.query().where('id', noteId).andWhere('ownerId', userId);
    if(!note) throw new Error(`Note not found or doesn't belong to this user.`);

    const attachmentObjects = files.map(file => {
      return {
        noteId,
        fileId: file.id,
      };
    });

    return NoteAttachment.query().insert(attachmentObjects).returning('*').eager('file');
  }
);
