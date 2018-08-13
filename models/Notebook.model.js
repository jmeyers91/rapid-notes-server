
module.exports = rapid => {
  const { Model, models } = rapid;

  return class Notebook extends Model {
    static get tableName() {
      return 'notebooks';
    }
    static get singularName() {
      return 'notebook';
    }

    static get jsonSchema() {
      return {
        type: 'object',
        required: ['ownerId', 'name'],
        properties: {
          id: {type: 'integer'},
          ownerId: {type: 'integer'},
          name: {type: 'string'}
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
            to: 'notebooks.ownerId'
          }
        },

        notes: {
          relation: Model.HasManyRelation,
          modelClass: models.Note,
          join: {
            from: 'notebooks.id',
            to: 'notes.noteBookId'
          }
        }
      };
    }
  };
};
