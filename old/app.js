const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const { mongooseConnection } = require('./helpers/db.js');
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

// Start-up server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
