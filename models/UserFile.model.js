
module.exports = rapid => {
  const { Model, models } = rapid;

  return class UserFile extends Model {
    static get tableName() { return 'user_files'; }
    static get singularName() { return 'user_file'; }

    static get jsonSchema() {
      return {
        type: 'object',
        required: [ 'ownerId', 'path' ],
        properties: {
          id: { type: 'integer' },
          ownerId: { type: 'integer' },
          path: { type: 'string' },
        },
      };
    }

    static get relationMappings() {
      return {
        owner: {
          relation: Model.BelongsToOneRelation,
          modelClass: models.User,
          join: {
            from: 'users.id',
            to: 'user_files.ownerId'
          },
        },
      };
    }
  };
};
