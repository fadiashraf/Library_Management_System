const AuthorModel = require('../data/models/author.model')

class AuthorRepo {
  createOne({ name }) {
    return AuthorModel.query().insertAndFetch({ name });
  }

  getAllBy({ filterObject: {}, selectFields: [], page, limit = 50 }) {
    const query = AuthorModel.query().skipUndefined().where(filterObject).select(selectFields);
    if (page) query.page(page - 1, limit);
    console.log(page);
    return query;
  }

  getOneById(id) {
    return AuthorModel.query().findById(id);
  }
}

module.exports = new AuthorRepo();
