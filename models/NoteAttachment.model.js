
module.exports = rapid => {
  const { Model, models } = rapid;

  return class NoteAttachment extends Model {
    static get tableName() { return 'note_attachments'; }
    static get singularName() { return 'note_attachment'; }

    static get jsonSchema() {
      return {
        type: 'object',
        required: [ 'noteId', 'fileId' ],
        properties: {
          id: { type: 'integer' },
          noteId: { type: 'integer' },
          fileId: { type: 'integer' },
        },
      };
    }

    static get relationMappings() {
      return {
        note: {
          relation: Model.BelongsToOneRelation,
          modelClass: models.Note,
          join: {
            from: 'notes.id',
            to: 'note_attachments.noteId'
          },
        },

        file: {
          relation: Model.BelongsToOneRelation,
          modelClass: models.UserFile,
          join: {
            from: 'user_files.id',
            to: 'note_attachments.fileId'
          },
        },
      };
    }
  };
};
