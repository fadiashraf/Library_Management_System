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
    table.integer('availableQuantity').defaultTo(0);
    table.string('shelfLocation').nullable().defaultTo('NA');
    table.integer('authorId').unsigned().references('id').inTable('authors').onDelete('SET NULL').onUpdate('CASCADE');
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
