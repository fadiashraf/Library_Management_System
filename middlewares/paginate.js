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

module.exports = paginate;
