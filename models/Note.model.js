module.exports = rapid => {
  const { Model, models } = rapid;

  return class Note extends Model {
    static get tableName() {
      return 'notes';
    }
    static get singularName() {
      return 'note';
    }

    static get jsonSchema() {
      return {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          id: { type: 'integer' },
          title: { type: 'string', minLength: 2 },
          content: { type: 'string', minLength: 2 }
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
        }
      };
    }
  };
};
