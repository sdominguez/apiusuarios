const {response} = require('express');
const crypto = require('crypto');
const UserDao = require('../dao/usuarios-dao');
const { use } = require('../routes/usuarios');
const { generarJWT } = require('../helpers/generar-jwt');

const hash = async (text)=> {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return hash.digest('hex');
}

const usuariosGet = async (req, res = response) => {
  try {
    const usuarios = await UserDao.listUsers();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
  }

  const usuariosCreatePost = async (req, res = response) => {
    const { nombre, email, password } = req.body;
    const pass = await hash(password);
    const user = { nombre, email, pass };
    try {
      const newUser = await UserDao.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }

  }

  const usuariosLogin = async (req, res = response) => {
    const { email, password } = req.body;
    const pass = await hash(password);
    try {
      const user = await UserDao.findUserByEmailPass(email,pass)
      //generarJWT
      const token = await generarJWT(user.id);
      res.json({
        email:user.email,
        token
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "verfique sus credenciales de acceso" });
    }

  }

  
  const usuariosUpdatePut = async (req, res = response) => {
    //Parametros de segmento
    const {id} = req.params;
    const { nombre, email, password } = req.body;
    const pass = await hash(password);
    const user = { nombre, email, pass };
    try {
      const updatedUser = await UserDao.updateUserById(id, user);
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }

  const usuariosUpdatePassPatch = async (req, res = response) => {
    const {id} = req.params;
    const { password } = req.body;
    const pass = await hash(password);
    try {
      const updatedPass = await UserDao.updatePassById(id, pass);
      res.json(updatedPass);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  }

  const usuariosDelete = async (req, res = response) => {
      const { id } = req.params;
      const uid = req.uid;
      try {
        await UserDao.deleteUserById(id);
        res.json({uid});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
      }
  }


  module.exports = {
    usuariosGet,
    usuariosLogin,
    usuariosCreatePost,
    usuariosUpdatePut,
    usuariosUpdatePassPatch,
    usuariosDelete
};