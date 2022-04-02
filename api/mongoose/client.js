const mongoose = require('mongoose');
const dotenv = require('dotenv');

module.exports = () => {
  dotenv.config();

  const { MONGO_CONNECTION_URI } = process.env;

  mongoose
    .connect(MONGO_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(err => console.log(err));

  const db = mongoose.connection;
  db.on('error', err => console.log(err));
  db.once('open', () => console.log('Connected with dovesAndDandysDB'));
};
