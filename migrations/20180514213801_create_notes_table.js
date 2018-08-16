exports.up = async knex => {
  if (await knex.schema.hasTable('notes')) return;
  return knex.schema.createTable('notes', table => {
    table.increments('id').primary();
    table.timestamps(true, true);

    table.integer('author_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();
    table.integer('revision').defaultTo(knex.raw('1'));
    table.text('title').notNullable();
    table.text('content').notNullable();

    table
      .integer('notebook_id')
      .references('id')
      .inTable('notebooks');
  });
};

exports.down = async knex => {
  if (await knex.schema.hasTable('notes')) {
    return knex.schema.dropTable('notes');
  }
};
