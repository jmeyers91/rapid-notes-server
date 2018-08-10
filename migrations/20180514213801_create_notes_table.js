exports.up = async knex => {
  if (await knex.schema.hasTable('notes')) return;
  return knex.schema.createTable('notes', table => {
    table.increments('id').primary();
    table.timestamps(true, true);

    table
      .integer('author_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();
    table.string('title').notNullable();
    table.string('content').notNullable();
  });
};

exports.down = async knex => {
  if (await knex.schema.hasTable('notes')) {
    return knex.schema.dropTable('notes');
  }
};
