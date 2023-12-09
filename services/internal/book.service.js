const httpStatus = require('http-status');
const ApiError = require('../../helpers/ApiError');
const booksRepo = require('../../repository/book.repo');
const pager = require('../../helpers/pager');
const authorService = require('./author.service');

const createOne = async ({ title, authorId, ISBN, availableQuantity, shelfLocation, pages, language }) => {
  await _ensureAuthorExists(authorId);
  await _ensureISBNNotExists(ISBN);
  return booksRepo.createOne({ title, authorId, ISBN, availableQuantity, shelfLocation, pages, language });
};

const getAllBooksByIds = (ids, selectFields) => {
  return booksRepo.getAllByIds(ids, selectFields);
};

const updateOne = async (id, updates) => {
  const book = await getOneById(id);
  await _ensureAuthorExists(updates?.authorId);
  await _ensureISBNNotExists(updates?.ISBN, book);
  return booksRepo.updateOne(id, updates);
};

const deleteOneById = async (id) => {
  // to avoid circular dependency
  const borrowingService = require('./borrowing.service');
  await getOneById(id);
  const isBookExistInBorrowings = !!(await borrowingService.getOneBy({ bookId: id }))?.length;
  if (isBookExistInBorrowings) {
    throw new ApiError(httpStatus.CONFLICT, `this book can not be deleted as it borrowed before`);
  }
  await booksRepo.deleteOne(id);
};

const decrementBookQuantity = (id, amountToDecrement, queryTrx) => {
  return booksRepo.decrementQuantity(id, amountToDecrement, queryTrx);
};

const incrementBookQuantity = (id, amountToIncrement, queryTrx) => {
  return booksRepo.incrementQuantity(id, amountToIncrement, queryTrx);
};

const getOneById = async (id) => {
  const book = await booksRepo.getOneById(id);
  if (!book) throw new ApiError(httpStatus.NOT_FOUND, `this book is not found`);
  return book;
};

// validate that ISBN in not existed before
const _ensureISBNNotExists = async (ISBN, oldBook) => {
  if (ISBN) {
    const isISBN_Existed = oldBook?.ISBN == ISBN ? false : !!(await booksRepo.getOneByISBN(ISBN));
    if (isISBN_Existed) throw new ApiError(httpStatus.BAD_REQUEST, `this ISBN is already existed`);
  }
};

const _ensureAuthorExists = async (authorId) => {
  if (authorId) {
    const author = await authorService.getOneById(authorId);
    if (!author) throw new ApiError(httpStatus.BAD_REQUEST, `this Author id in not existed`);
  }
};

/**
 * The function "getBooks" get books by filters
 * @param {string} title  search by title of the book
 * @param {number} authorId  search by author id  of books
 * @param {string} author  search by author name
 * @param {string} ISBN  search by author ISBN
 * @param {number} page  page number
 * @param {number} limit  limit per page
 */
const getBooks = async ({ title, authorId, author, ISBN, page, limit }) => {
  const authorsIds = await _handleAuthorSearch(author, authorId);
  const { results, total } = await booksRepo.getBooksBy({ title, authorsIds, ISBN, page, limit });
  return { books: results, ...pager(total, page, limit) };
};

/**
 * The function `_handleAuthorSearch` searches for author IDs based on the provided author name and ID.
 * @param authorName - The `authorName` parameter is a string that represents the name of the author
 * you want to search for.
 * @param authorId - The authorId parameter is an optional parameter that represents the ID of an
 * author.
 * @returns an array of author IDs.
 */
const _handleAuthorSearch = async (authorName, authorId) => {
  let authorsIds = [];
  if (authorId) authorsIds.push(authorId);
  if (authorName) {
    const searchIdsResult = await authorService.getAuthorsIdsByName(authorName);
    authorsIds = [...authorsIds, ...searchIdsResult];
  }
  return authorsIds;
};

module.exports = {
  getBooks,
  getOneById,
  createOne,
  getOneById,
  getAllBooksByIds,
  updateOne,
  deleteOneById,
  decrementBookQuantity,
  incrementBookQuantity,
};
