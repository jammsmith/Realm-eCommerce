const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const mongooseConnection = require('./helpers/mongooseConnection.js');
const schema = require('./graphqlSchema/schema.js');
const app = express();

// Find and declare dotenv vars
dotenv.config({ path: '../.env' });
const { PORT } = process.env;

// Middleware
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create Mongoose connection.
mongooseConnection();
// Set mongoose to always return the updated value after a mutation.
// Default behaviour is to return the original value before mutation.
mongoose.set('returnOriginal', false);

// Start-up server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
