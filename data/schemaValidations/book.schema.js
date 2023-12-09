const yup = require('yup');

const createBookSchema = yup.object({
  title: yup.string().required().min(2),
  ISBN: yup.string().required(),
  authorId: yup.number().integer(),
  availableQuantity: yup.number().integer().default(1),
  pages: yup.number().integer(),
  shelfLocationId: yup.string(),
  language: yup.string(),
}).noUnknown();

const atLeastOneKeyRequired = yup
  .object()
  .test('atLeastOneKey', 'At least one key is required', (value) => Object.keys(value).length > 0);

const updateBookSchema = yup
  .object()
  .shape({
    title: yup.string().min(2),
    ISBN: yup.string(),
    authorId: yup.number().integer(),
    availableQuantity: yup.number().integer(),
    pages: yup.number().integer(),
    shelfLocationId: yup.string(),
    language: yup.string(),
  })
  .concat(atLeastOneKeyRequired);

const getBooksSchema = yup.object({
  title: yup.string(),
  authorId: yup.number().integer(),
  author: yup.string(), // author name
  ISBN: yup.string(),
  page: yup.number().integer().default(1),
  limit: yup.number().integer().default(50),
}).noUnknown();

module.exports = { createBookSchema, getBooksSchema, updateBookSchema };
