require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const { putError } = require('./utils/error-codes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const app = express();

const {
  PORT, NODE_ENV, DATA_MOVIES, MONGOOSE_URL,
} = require('./utils/config');

app.use(bodyParser.json());
app.use(helmet());
app.use(requestLogger);
app.use(
  cors({
    credentials: true,
    origin: [
      'https://api.sergynya174.developer.diplom.nomoredomains.xyz',
      'http://api.sergynya174.developer.diplom.nomoredomains.xyz',
      'https://sergynya174.developer.diplom.nomoredomains.xyz',
      'http://sergynya174.developer.diplom.nomoredomains.xyz',
      'http://localhost:3001',
      'http://localhost:3000',
      'https://localhost:3001',
      'https://localhost:3000',
    ],
  }),
);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect(NODE_ENV === 'production' ? MONGOOSE_URL : DATA_MOVIES, {
  useNewUrlParser: true,
  family: 4,
});

app.use('/', routes);

app.use(errorLogger);
app.use(errors());

app.use(putError);
app.listen(PORT, () => {
  console.log(`App started on ${PORT} port`);
});
