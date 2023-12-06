const httpStatus = require('http-status');
const ApiError = require('../../helpers/ApiError');
const adminRepo = require('../../repository/admin.repo');
const { hashPassword } = require('../../helpers/bcrypt');

class AdminService {
  /**
   * get Admin user by email
   * @param {string} email
   * @returns {Promise<Admin>}
   */
  getAminByEmail(email) {
    return adminRepo.getAdminByEmail(email);
  }

  getAdminById(id) {
    return adminRepo.getAdminById(id);
  }

  async isEmailExists(email) {
    return !!(await this.getAminByEmail(email));
  }

  async validateIfEmailExist(email) {
    if (await this.isEmailExists(email)) throw new ApiError(httpStatus.CONFLICT, 'Email already taken');
  }

  async createAdmin({ name, email, password }) {
    // check if email  already existed
    await this.validateIfEmailExist(email);
    // hash password
    const hashedPassword = hashPassword(password);
    // create Admin in DB
    return adminRepo.createAdmin({ name, email, password: hashedPassword });
  }
}

module.exports = new AdminService();
