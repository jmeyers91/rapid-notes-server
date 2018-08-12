module.exports = rapid => {
  const { Model, models } = rapid;

  return class User extends Model {
    static get tableName() {
      return 'users';
    }
    static get singularName() {
      return 'user';
    }

    static get jsonSchema() {
      return {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          id: { type: 'integer' },
          email: { type: 'string', minLength: 3 },
          password: { type: 'string', minLength: 2 }
        }
      };
    }

    static get relationMappings() {
      return {
        notes: {
          relation: Model.HasManyRelation,
          modelClass: models.Note,
          join: {
            from: 'users.id',
            to: 'notes.authorId'
          }
        }
      };
    }
  };
};
