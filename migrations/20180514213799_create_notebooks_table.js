exports.up = async knex => {
  if (await knex.schema.hasTable('notebooks')) return;
  return knex.schema.createTable('notebooks', table => {
    table.increments('id').primary();
    table.timestamps(true, true);

    table.text('name').notNullable();
    
    table.integer('owner_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();
  });
};

exports.down = async knex => {
  if (await knex.schema.hasTable('notebooks')) {
    return knex.schema.dropTable('notebooks');
  }
};
