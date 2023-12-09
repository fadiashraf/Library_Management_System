const pager = (count, page, pageSize) => {
  const pages = Math.ceil(count / pageSize);
  return {
    pages,
    next: pages > page ? page + 1 : null,
    previous: page > 1 ? page - 1 : null,
    count,
  };
};
module.exports = pager;
