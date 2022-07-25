const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/not-found-err');
const ForbiddenError = require('../utils/errors/forbidden-err');
const ValidationError = require('../utils/errors/validation-err');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(err);
    });
};

const postMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      }
      next(err);
    });
};

const deleteMovies = (req, res, next) => {
  const { movieId } = req.params;
  const { userId } = req.user._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError('У вас нет доступа');
      } else {
        Movie.findByIdAndRemove(movieId)
          .then(() => {
            res.send({ messege: 'Фильм удален' });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Введены некорректные данные');
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  postMovies,
  deleteMovies,
};
