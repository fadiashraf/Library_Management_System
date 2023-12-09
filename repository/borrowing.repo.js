const borrowingModel = require('../data/models/borrowing.model');
const borrowingStatues = require('../constants/borrowingStatues');

const getById = (id) => {
  return borrowingModel.query().findById(id);
};

const createOne = (borrowingData, DBTrx) => {
  return borrowingModel.query(DBTrx).insertAndFetch(borrowingData);
};

const updateOne = (id, updates) => {
  return borrowingModel.query().updateAndFetchById(id, updates);
};

const setAsReturned = (id, DBTrx) => {
  return borrowingModel
    .query(DBTrx)
    .update({ returnedAt: borrowingModel.raw('CURRENT_TIMESTAMP') })
    .where({ id });
};

const getOneBy = ({ userId, bookId }) => {
  const query = borrowingModel.query();
  if (userId) query.where({ userId });
  if (bookId) query.where({ bookId });
  return query.first();
};

const getAll = ({ userId, fromCheckDate, toCheckDate, bookId, page, limit, statusType, ignorePagination = false }) => {
  const query = borrowingModel
    .query()
    .select(['id', 'quantity', 'checkOutDate', 'dueDate', 'returnedAt', 'created_at', 'updated_at'])
    .withGraphFetched('[user(forBorrowings),book(forBorrowings)]');
  if (userId) query.where({ userId });
  if (bookId) query.where({ bookId });
  if (fromCheckDate) query.where('checkOutDate', '>=', fromCheckDate);
  if (toCheckDate) query.where('checkOutDate', '<=', toCheckDate);

  if (!ignorePagination) {
    query.page(page - 1, limit);
  }

  switch (statusType) {
    case borrowingStatues.RETURNED:
      query.whereNotNull('returnedAt');
      break;
    case borrowingStatues.EXCEED_DUE_DATE:
      query.whereNull('returnedAt').where('dueDate', '<=', borrowingModel.raw('CURRENT_TIMESTAMP'));
      break;
    case borrowingStatues.NOT_RETURNED:
      query.whereNull('returnedAt');
      break;
    default:
      break;
  }
  return query;
};

const getBorrowingsByIds = (borrowingsIds) => {
  return borrowingModel.query().whereIn('id', borrowingsIds);
};

module.exports = {
  getById,
  createOne,
  updateOne,
  setAsReturned,
  getOneBy,
  getAll,
  getBorrowingsByIds,
};
