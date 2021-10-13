const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
require('dotenv').config();

const app = express();

// Settings
app.set('port', process.env.PORT || 3500);

// Routes
app.get('/', (req, res) => {
  res.send('Hola, bienvenido al servidor');
});

app.use('/graphql', graphqlHTTP(async (req) => ({
  schema,
  graphiql: {
    headerEditorEnabled: true,
  },
  context: {
    token: req.headers['auth-token'],
  },
})));

module.exports = app;
