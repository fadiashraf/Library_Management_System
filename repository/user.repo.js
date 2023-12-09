const UserModel = require('../data/models/user.model');

const getByEmail = (email) => {
  return UserModel.query().findOne('email', email);
};

const getById = (id) => {
  return UserModel.query().findById(id);
};

const createOne = (userData) => {
  return UserModel.query().insertAndFetch(userData);
};

const updateOne = (id, updates) => {
  return UserModel.query().updateAndFetchById(id, updates);
};

const getUsers = ({ name, email, page = 1, limit = 50 }) => {
  const query = UserModel.query().page(page - 1, limit);
  if (name) query.whereILike('name', `%${name}%`);
  if (email) query.where({ email });
  return query;
};

const deleteOne = (id) => {
  return UserModel.query().deleteById(id);
};

module.exports = {
  getByEmail,
  getById,
  createOne,
  updateOne,
  getUsers,
  deleteOne,
};
