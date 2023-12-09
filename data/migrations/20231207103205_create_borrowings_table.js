/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('borrowings', function (table) {
    table.increments('id').primary();
    table.integer('quantity').unsigned().defaultTo(1);
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
      .notNullable();
    table
      .integer('bookId')
      .unsigned()
      .references('id')
      .inTable('books')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
      .notNullable();
    table.timestamp('checkOutDate').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('dueDate').notNullable();
    table.timestamp('returnedAt').nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('borrowings');
};
