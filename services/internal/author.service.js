const httpStatus = require('http-status');
const ApiError = require('../../helpers/ApiError');
const authorRepo = require('../../repository/author.repo');
const pager = require('../../helpers/pager');

const createOne = async ({ name }) => {
  const author = await authorRepo.getOneByName(name);
  if (author) throw new ApiError(httpStatus.CONFLICT, `this Author already existed with id = ${author.id}`);
  return authorRepo.createOne({ name });
};

const getOneById = async (id) => {
  const author = await authorRepo.getOneById(id);
  if (!author) throw new ApiError(httpStatus.NOT_FOUND, 'NOT FOUND');
  return author;
};

const updateOneById = async (id, updates) => {
  const author = await authorRepo.getOneById(id);
  if (!author) throw new ApiError(httpStatus.NOT_FOUND, 'NOT FOUND');
  return authorRepo.updateOne(id, updates);
};

const getAuthors = async ({ name, page, limit }) => {
  const { results: authors, total } = await authorRepo.getByName({ name, page, limit });
  return { authors, ...pager(total, page, limit) };
};

const getAuthorsIdsByName = async (name) => {
  const authors = await authorRepo.getAuthorsIdsByName(name);
  if (!authors?.length) return [];
  return authors.map(({ id }) => id);
};

module.exports = { getAuthorsIdsByName, getAuthors, updateOneById, getOneById, createOne };
