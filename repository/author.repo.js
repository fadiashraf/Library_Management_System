const AuthorModel = require('../data/models/author.model');

const createOne = (author) => {
  return AuthorModel.query().insertAndFetch(author);
};

const updateOne = (id, updates) => {
  return AuthorModel.query().patchAndFetchById(id, updates);
};

const getByName = ({ name, page = 1, limit = 50 }) => {
  const query = AuthorModel.query().page(page - 1, limit);
  if (name) query.whereRaw('MATCH(name) AGAINST(? IN BOOLEAN MODE)', [name]);
  return query;
};

const getAuthorsIdsByName = (name) => {
  return AuthorModel.query().select('id').whereRaw('MATCH(name) AGAINST(? IN BOOLEAN MODE)', [name]);
};

const getOneById = (id) => {
  return AuthorModel.query().findById(id);
};

const getOneByName = (name) => {
  return AuthorModel.query().where({ name }).first();
};

module.exports = {
  createOne,
  updateOne,
  getByName,
  getAuthorsIdsByName,
  getOneById,
  getOneByName,
};
