const router = require('express').Router();
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../utils/validations');

const {
  getMovies,
  postMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post(
  '/movies',
  createMovieValidation,
  postMovies,
);

router.delete(
  '/movies/_id',
  deleteMovieValidation,
  deleteMovies,
);

module.exports.movieRouter = router;
