const { Model } = require('objection');

class Author extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'books';
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
      books: {
        relation: Model.HasOneRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one.
        modelClass: require('./author.model').default,
        join: {
          from: 'books.author_id',
          to: 'authors.id',
        },
      },
    };
  }
}