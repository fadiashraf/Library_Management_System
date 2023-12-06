/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('books', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('ISBN').notNullable().unique();
    table.string('language').nullable();
    table.integer('pages').nullable().unsigned();
    table.integer('year').nullable();
    table.integer('available_quantity').defaultTo(0);
    table.string('shelf_location').nullable().defaultTo('NA');
    table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('SET NULL').onUpdate('CASCADE');
    table.index('title', 'idx_title', 'FULLTEXT');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('books');
};
