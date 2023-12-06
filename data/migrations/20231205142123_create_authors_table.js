/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('authors', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
    table.index('name', 'idx_name', 'FULLTEXT');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('authors');
};
