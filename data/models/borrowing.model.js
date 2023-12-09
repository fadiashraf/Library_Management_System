const { Model } = require('objection');
const knex = require('../index');

Model.knex(knex);

module.exports = class Borrowing extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'borrowings';
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return 'id';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one.
        modelClass: require('./user.model'),
        join: {
          from: 'borrowings.userId',
          to: 'users.id',
        },
      },
      book: {
        relation: Model.HasOneRelation,
        modelClass: require('./book.model'),
        join: {
          from: 'borrowings.bookId',
          to: 'books.id',
        },
      },
    };
  }

  static get modifiers() {
    return {};
  }
};
