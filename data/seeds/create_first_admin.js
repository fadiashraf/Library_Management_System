const { hashPassword } = require('../../helpers/bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('admins')
    .insert([
      {
        name: 'Fady',
        email: 'email@example.com',
        password: await hashPassword('12345678'),
      },
    ])
    .onConflict()
    .ignore();
};
