module.exports = rapid => {
  const { Model, models } = rapid;

  return class Note extends Model {
    static get tableName() { return 'notes'; }
    static get singularName() { return 'note'; }

    static get jsonSchema() {
      return {
        type: 'object',
        required: [ 'title', 'content' ],
        properties: {
          id: { type: 'integer' },
          revision: { type: 'integer' },
          title: { type: 'string' },
          content: { type: 'string' },
        }
      };
    }

    static get relationMappings() {
      return {
        author: {
          relation: Model.BelongsToOneRelation,
          modelClass: models.User,
          join: {
            from: 'users.id',
            to: 'notes.authorId'
          }
        },

        attachments: {
          relation: Model.HasManyRelation,
          modelClass: models.NoteAttachment,
          join: {
            from: 'notes.id',
            to: 'note_attachments.noteId',
          },
        },
      };
    }
  };
};
