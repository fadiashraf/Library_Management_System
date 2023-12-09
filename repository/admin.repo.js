const AdminModel = require('../data/models/admin.model');

const getAdminByEmail = (email) => {
  return AdminModel.query().findOne('email', email);
};

const getAdminById = (id) => {
  return AdminModel.query().findById(id);
};

const createAdmin = ({ name, email, password }) => {
  return AdminModel.query().insertAndFetch({ name, email, password });
};

module.exports = {
  getAdminByEmail,
  getAdminById,
  createAdmin,
};
