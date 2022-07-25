const putError = (err, req, res, next) => {
  if (err.statusCode) {
    return res
      .status(err.statusCode)
      .send({ message: err.message || 'Что-то пошло не так' });
  }
  res.status(500).send({ message: 'Ошибка сервера' });
  return next(err);
};

const validateURL = (value) => {
  if (value !== value.match(/^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/).join('')) {
    throw new Error('Неверный формат ссылки');
  }
  return value;
};

module.exports = {
  putError,
  validateURL,
};
