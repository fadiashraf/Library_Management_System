const AdminModel = require('../data/models/admin.model')

class AdminRepo {
  /**
   * The function `getAdminByEmail` retrieves an admin user from the database based on their email.
   * @param email - The `email` parameter is a string that represents the email address of an admin user.
   * @returns The function `getAdminByEmail` returns a promise that resolves to the admin object with the
   * specified email address.
   */
  getAdminByEmail(email) {
    return AdminModel.query().findOne('email', email);
  }

  getAdminById(id) {
    return AdminModel.query().findById(id);
  }

  createAdmin({ name, email, password }) {
    return AdminModel.query().insertAndFetch({ name, email, password });
  }
}

module.exports = new AdminRepo();
