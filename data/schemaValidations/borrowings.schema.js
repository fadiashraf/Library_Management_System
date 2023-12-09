const yup = require('yup');
const moment = require('moment');
const { val } = require('objection');
const borrowingStatues = require('../../constants/borrowingStatues');

const borrowSchema = yup
  .object({
    userId: yup.number().integer().required(),
    books: yup
      .array()
      .required()
      .min(1)
      .of(
        yup
          .object({
            id: yup.number().integer().required(),
            quantity: yup.number().integer().default(1),
            dueDate: yup.string().transform((value, originalValue) => {
              return moment.unix(value).format('YYYY-MM-DD HH:mm:ss');
            }),
          })
          .required()
      ),
  })
  .noUnknown();

const returnBooksSchema = yup
  .object({
    borrowingIds: yup.array().min(1).required().of(yup.number().integer()),
  })
  .noUnknown();

const getBorrowingsSchema = yup
  .object({
    userId: yup.number().integer(),
    statusType: yup.string().oneOf(Object.values(borrowingStatues)).default(borrowingStatues.ALL),
    bookId: yup.number().integer(),
    page: yup.number().integer().default(1),
    limit: yup.number().integer().default(50),
    ignorePagination: yup.boolean().default(false),
    fromCheckDate: yup.string().transform((value, originalValue) => {
      return moment.unix(value).format('YYYY-MM-DD HH:mm:ss');
    }),
    toCheckDate: yup.string().transform((value, originalValue) => {
      return moment.unix(value).format('YYYY-MM-DD HH:mm:ss');
    }),
  }).test('toCheckDate', 'toCheckDate must be after fromCheckDate', ({ fromCheckDate, toCheckDate }) => {
    if (fromCheckDate && toCheckDate) {
      return moment(toCheckDate).isAfter(fromCheckDate);
    }
    return true;
  });
module.exports = { borrowSchema, returnBooksSchema, getBorrowingsSchema };
