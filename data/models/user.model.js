const { Model } = require('objection');
const knex = require('../index');

Model.knex(knex);

class UserModel extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return 'id';
  }

  static get modifiers() {
    return {
      $name: (query) => query.select('name'),
      forBorrowings: (query) => query.select(['id', 'name', 'email']),
    };
  }
}
module.exports = UserModel;
