const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Sergey Matrosov',
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
      validate: [isEmail, { message: 'Некорректный email' }],
    },
    password: {
      type: String,
      required: [true, 'Поле "password" должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
