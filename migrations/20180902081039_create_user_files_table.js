exports.up = async knex => {
  if (await knex.schema.hasTable('user_files')) return;
  return knex.schema.createTable('user_files', table => {
    table.increments('id').primary();
    table.timestamps(true, true);
    table.string('name').notNullable();
    table.string('mimetype').notNullable();

    table
      .string('path')
      .notNullable()
      .unique();

    table
      .integer('owner_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();
  });
};

exports.down = async knex => {
  if (await knex.schema.hasTable('user_files')) {
    return knex.schema.dropTable('user_files');
  }
};
