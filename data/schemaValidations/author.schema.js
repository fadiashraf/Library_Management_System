const yup = require('yup');

const createAuthorSchema = yup.object({
  name: yup.string().required(),
}).noUnknown();

const getAuthorsSchema = yup.object({
  name: yup.string(),
  page: yup.number().integer().default(1),
  limit: yup.number().integer().default(50),
}).noUnknown();

const updateAuthorSchema = yup.object({
  name: yup.string().required(),
}).noUnknown();

module.exports = { createAuthorSchema, getAuthorsSchema, updateAuthorSchema };
