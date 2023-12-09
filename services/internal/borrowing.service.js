const httpStatus = require('http-status');
const ApiError = require('../../helpers/ApiError');
const bookService = require('./book.service');
const pager = require('../../helpers/pager');
const performDBTransaction = require('../../data/performDBTransaction');
const borrowingRepo = require('../../repository/borrowing.repo');
const borrowingStatues = require('../../constants/borrowingStatues');
const userService = require('./user.service');
const ExcelJS = require('exceljs');

/**
 * The `borrowBooks` function allows a user to borrow multiple books by checking their availability
 * and creating borrowing records in the database.
 * @param userId - The `userId` parameter is the unique identifier of the user who wants to borrow
 * the books.
 * @param books - The `books` parameter is an array of objects that represent the books to be
 * borrowed. Each object in the array should have the following properties:
 *   id , quantity , dueDate , returnedAt
 */
const borrowBooks = async (userId, books) => {
  const user = await userService.getUserById(userId);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, `this user is not found`);

  // check available book available quantity and throw error if some are not available
  await ensureBookAvailability(books);

  const borrowingPromises = [];
  const updateBookPromises = [];
  for (const requestedBook of books) {
    const { id: bookId, ...borrowingObject } = { userId, ...requestedBook };
    borrowingPromises.push((trx) => borrowingRepo.createOne({ ...borrowingObject, bookId }, trx));
    updateBookPromises.push((trx) => bookService.decrementBookQuantity(requestedBook.id, requestedBook.quantity, trx));
  }
  // create borrowing and decrement the quantity as DB transaction
  await performDBTransaction([...updateBookPromises, ...borrowingPromises]);
};

/**
 * checks if a list of requested books are available in the database with the requested quantity.
 * @param requestedBooks - An array of objects representing the books that the user has requested.
 * Each object should have the following properties:
 *  id , quantity , dueDate , returnedAt
 */
const ensureBookAvailability = async (requestedBooks) => {
  const booksIds = requestedBooks.map((book) => book.id);
  const booksFromDB = await bookService.getAllBooksByIds(booksIds, ['id', 'availableQuantity', 'title']);
  const notAvailableBooksTitles = [];
  for (const requestedBook of requestedBooks) {
    // check that each book exist
    const existedBook = booksFromDB.find(({ id }) => id == requestedBook.id);
    if (!existedBook) {
      throw new ApiError(httpStatus.BAD_REQUEST, `this book with id ${requestedBook.id} is not found`);
    }
    const availableQuantity = existedBook.availableQuantity;

    // if there is a feature that user can order multiple quantity per book , by default = 1
    const requestQuantity = requestedBook.quantity || 1;

    // check book availability
    const isQuantityAvailable = availableQuantity >= requestQuantity;
    if (!isQuantityAvailable) {
      notAvailableBooksTitles.push(existedBook.title);
    }
  }
  if (notAvailableBooksTitles.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `these books ( ${notAvailableBooksTitles.toString()} ) are not available with requested quantity`
    );
  }
};

const _setBorrowingsReturned = (id, DBTrx) => {
  return borrowingRepo.setAsReturned(id, DBTrx);
};

const getOneBy = ({ userId, bookId }) => {
  return borrowingRepo.getOneBy({ userId, bookId });
};

const getBorrowings = async ({
  userId,
  statusType = borrowingStatues.ALL,
  fromCheckDate,
  toCheckDate,
  bookId,
  page,
  limit,
  ignorePagination = false,
}) => {
  const borrowings = await borrowingRepo.getAll({
    userId,
    statusType,
    fromCheckDate,
    toCheckDate,
    bookId,
    page,
    limit,
    ignorePagination,
  });

  if (ignorePagination) {
    return { borrowings };
  }
  return { borrowings: borrowings.results, ...pager(borrowings.total, page, limit) };
};

const exportBorrowings = async ({ userId, statusType = borrowingStatues.ALL, fromCheckDate, toCheckDate, bookId }) => {
  const borrowings = await borrowingRepo.getAll({
    userId,
    statusType,
    fromCheckDate,
    toCheckDate,
    bookId,
    ignorePagination: true,
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('borrowings');
  const formattedData = _getExportFileRows(borrowings) || [];

  // Add data to the worksheet
  formattedData.map((row) => {
    worksheet.addRow(row);
  });
  return workbook;
};

const _getExportFileRows = (borrowings) => {
  const headerRow = [
    'Borrowing id',
    'Quantity',
    'Check Out Date',
    'Due Date',
    'Returned At',
    'user name',
    'user email',
    'book title',
  ];
  const rows = [headerRow];
  if (borrowings?.length) {
    borrowings.forEach((borrow) => {
      rows.push([
        borrow.id,
        borrow.quantity,
        borrow.checkOutDate,
        borrow.dueDate,
        borrow.returnedAt,
        borrow.user.name,
        borrow.user.email,
        borrow.book.title,
      ]);
    });
  }
  return rows;
};

const returnBorrowings = async (borrowingIds) => {
  const borrowings = await borrowingRepo.getBorrowingsByIds(borrowingIds);
  const updateBooksQuantityPromises = [],
    borrowingPromises = [];
  borrowings.map((borrow) => {
    updateBooksQuantityPromises.push((DBTrx) =>
      bookService.incrementBookQuantity(borrow.bookId, borrow.quantity, DBTrx)
    );
    borrowingPromises.push((DBTrx) => _setBorrowingsReturned(borrow.id, DBTrx));
  });
  await performDBTransaction([...updateBooksQuantityPromises, ...borrowingPromises]);
};

module.exports = { returnBorrowings, ensureBookAvailability, getBorrowings, getOneBy, borrowBooks, exportBorrowings };
