const BookModel = require('../data/models/book.model');

const createOne = (booksObject) => {
  return BookModel.query().insertAndFetch(booksObject);
};

const getBooksBy = ({ title, authorsIds, ISBN, page = 1, limit = 50 }) => {
  const query = BookModel.query()
    .withGraphFetched('author(forBooks)')
    .page(page - 1, limit);
  if (authorsIds?.length) query.whereIn('authorId', authorsIds);
  if (ISBN) query.where({ ISBN });
  if (title) query.whereRaw('MATCH(title) AGAINST(? IN BOOLEAN MODE)', [title]);
  return query;
};

const getAllByIds = (booksIdsArray = [], selectFields = []) => {
  return BookModel.query().whereIn('id', booksIdsArray).select(selectFields);
};

const getOneById = (id) => {
  return BookModel.query().findById(id);
};

const updateOne = (id, updates) => {
  return BookModel.query().updateAndFetchById(id, updates);
};

const deleteOne = (id) => {
  return BookModel.query().deleteById(id);
};

const getOneByISBN = (ISBN) => {
  return BookModel.query().findOne({ ISBN });
};

const decrementQuantity = (id, amountToDecrement, trx) => {
  return BookModel.query(trx).findById(id).decrement('availableQuantity', amountToDecrement);
};

const incrementQuantity = (id, amountToIncrement, trx) => {
  return BookModel.query(trx).findById(id).increment('availableQuantity', amountToIncrement);
};

module.exports = {
  createOne,
  getBooksBy,
  getAllByIds,
  getOneById,
  updateOne,
  deleteOne,
  getOneByISBN,
  decrementQuantity,
  incrementQuantity,
};
