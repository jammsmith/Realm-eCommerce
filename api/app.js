const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./graphqlSchema/schema.js');
const app = express();

dotenv.config({ path: '../.env' });

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create Mongoose connection

const { MONGO_CONNECTION_URI } = process.env;

mongoose
  .connect(MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .catch(err => console.log(err));

// Check mongoose connection
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log('Connected with dovesAndDandysDB'));
//

const PORT = process.env.PORT;

app.listen(5000, () => console.log('Server running on port 5000'));
