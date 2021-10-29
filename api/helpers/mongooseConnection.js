const mongoose = require('mongoose');
const dotenv = require('dotenv');

const mongooseConnection = () => {
  dotenv.config();

  const { MONGO_CONNECTION_URI } = process.env;

  mongoose
    .connect(MONGO_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .catch(err => console.log(err));

  const db = mongoose.connection;
  db.on('error', err => console.log(err));
  db.once('open', () => console.log('Connected with dovesAndDandysDB'));
};

module.exports = mongooseConnection;
