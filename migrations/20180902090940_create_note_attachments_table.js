exports.up = async knex => {
  if (await knex.schema.hasTable('note_attachments')) return;
  return knex.schema.createTable('note_attachments', table => {
    table.increments('id').primary();
    table.timestamps(true, true);

    table
      .integer('note_id')
      .references('id')
      .inTable('notes')
      .onDelete('CASCADE')
      .notNullable();

    table
      .integer('file_id')
      .references('id')
      .inTable('user_files')
      .onDelete('CASCADE')
      .notNullable();
  });
};

exports.down = async knex => {
  if (await knex.schema.hasTable('note_attachments')) {
    return knex.schema.dropTable('note_attachments');
  }
};
