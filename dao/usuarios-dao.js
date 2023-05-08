const { usuarios } = require('../models');

class UsuariosDao {
  static async createUser(user) {
    return await usuarios.create(user);
  }

  static async listUsers() {
    return await usuarios.findAll();
  }

  static async findUserById(id) {
    return await usuarios.findByPk(id);
  }

  static async findUserByEmail(email) {
    return await usuarios.findOne({ where: { email } });
  }

  static async findUserByEmailPass(email, pass) {
    return await usuarios.findOne({ where: {email, pass} });
  }

  static async updateUserById(id, user) {
    const updatedUser = await usuarios.update(user, { where: { id } });
    return updatedUser;
  }

  static async updatePassById(id, pass) {
    const updatedUser = await usuarios.update({pass : pass}, { where: { id } });
    return updatedUser;
  }

  static async deleteUserById(id) {
    return await usuarios.destroy({ where: { id } });
  }
}

module.exports = UsuariosDao;
