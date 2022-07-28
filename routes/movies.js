const router = require('express').Router();
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../utils/validations');
const Authorized = require('../middlewares/auth');

const {
  getMovies,
  postMovies,
  deleteMovies,
} = require('../controllers/movies');

router.use(Authorized);
router.get('/', getMovies);
router.post(
  '/',
  createMovieValidation,
  postMovies,
);
router.delete(
  '/:movieId',
  deleteMovieValidation,
  deleteMovies,
);

module.exports.movieRouter = router;
