const router = require('express').Router();
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');
const Authorized = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/not-found-err');
const { login, createUser } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../utils/validations');

router.post(
  '/signin',
  loginValidation,
  login,
);

router.post(
  '/signup',
  createUserValidation,
  createUser,
);

router.use(Authorized);
router.use('/', userRouter);
router.use('/', movieRouter);

router.all('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
