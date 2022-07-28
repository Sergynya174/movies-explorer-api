const router = require('express').Router();
const { updateUserValidate } = require('../utils/validations');
const Authorized = require('../middlewares/auth');
const {
  getUsers,
  patchUsers,
} = require('../controllers/users');

router.use(Authorized);
router.get('/me', getUsers);
router.patch(
  '/me',
  updateUserValidate,
  patchUsers,
);

module.exports.userRouter = router;
