const {
  PORT = 3000,
  JWT_SECRET,
  NODE_ENV,
  MONGOOSE_URL,
} = process.env;

const DATA_MOVIES = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  DATA_MOVIES,
  PORT,
  JWT_SECRET,
  NODE_ENV,
  MONGOOSE_URL,
};
