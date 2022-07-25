const router = require('express').Router();
const { updateUserValidate } = require('../utils/validations');
const {
  getUsers,
  patchUsers,
} = require('../controllers/users');

router.get('/users/me', getUsers);

router.patch(
  '/users/me',
  updateUserValidate,
  patchUsers,
);

module.exports.userRouter = router;
