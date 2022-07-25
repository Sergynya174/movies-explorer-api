const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: [isURL, { message: 'Некорректный формат ссылки' }],
    },
    trailerLink: {
      type: String,
      required: true,
      validate: [isURL, { message: 'Некорректный формат ссылки' }],
    },
    thumbnail: {
      type: String,
      required: true,
      validate: [isURL, { message: 'Некорректный формат ссылки' }],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'movie',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      require: true,
    },
    nameEN: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
