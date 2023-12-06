const paginate = (pageSize) => (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  pageSize = req.query.limit || req.body.limit || pageSize;
  req.page = {
    page,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };

  next();
};

const pager = (count, page, pageSize) => {
  const pages = Math.ceil(count / pageSize);
  return {
    pages,
    next: pages > page ? page + 1 : null,
    previous: page > 1 ? page - 1 : null,
  };
};

module.exports = { paginate, pager };
