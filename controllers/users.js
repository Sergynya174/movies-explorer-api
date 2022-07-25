const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/not-found-err');
const ValidationError = require('../utils/errors/validation-err');
const AuthError = require('../utils/errors/authorized-err');
const UserAlreadyExists = require('../utils/errors/user-already-exists');

const { JWT_SECRET, NODE_ENV } = process.env;

const saltRounds = 10;

const getUsers = (req, res, next) => {
  User.find(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!password || !email) {
    throw new ValidationError('Почта или пароль должны быть заполнены');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new UserAlreadyExists('Такой пользователь уже существует');
      } else {
        bcrypt.hash(password, saltRounds)
          .then((hash) => User.create({
            name,
            email,
            password: hash,
          }))
          .then((userData) => res.send({
            name: userData.name,
            id: userData._id,
            email: userData.email,
          }))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new ValidationError('Некорректные данные при создании пользователя'));
            }
            if (err.code === 11000) {
              next(new UserAlreadyExists('Такой пользователь уже существует'));
            }
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const patchUsers = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ValidationError(`Переданы некорректные данные ${err.message}`),
        );
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'ASDFGHJKL',
        { expiresIn: '7d' },
      );
      const { name } = user;
      res.send({ token, name });
    })
    .catch(() => {
      next(new AuthError('Неверный логин или пароль'));
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').send();
};

module.exports = {
  getUsers,
  createUser,
  patchUsers,
  login,
  logout,
};