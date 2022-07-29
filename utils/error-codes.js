const validator = require('validator');

const putError = (err, req, res, next) => {
  if (err.statusCode) {
    return res
      .status(err.statusCode)
      .send({ message: err.message || 'Что-то пошло не так' });
  }
  res.status(500).send({ message: 'Ошибка сервера' });
  return next(err);
};

const validateURL = (url) => {
  const result = validator.isUrl(url);

  if (!result) {
    throw new Error('Некорректный формат ссылки');
  }
  return url;
};

module.exports = {
  putError,
  validateURL,
};
