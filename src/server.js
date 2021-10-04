const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

// Settings
app.set('port', process.env.PORT || 3500);

// Routes
app.get('/', (req, res) => {
  res.send('Hola, bienvenido al servidor');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = app;
