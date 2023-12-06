const httpStatus = require('http-status');
const ApiError = require('../../helpers/ApiError')
const authorRepo = require('../../repository/authors.repo');

class AuthorService {
  createOne({ name }) {
    return authorRepo.createOne({ name });
  }

  getOneById(id) {
    return authorRepo.getOneById(id);
  }

  getAuthors({ filter, page, limit }) {
    return authorRepo.getAllBy({ filterObject: filter, page, limit });
  }
}

module.exports = new AuthorService();
