const express = require('express');

const app = express();

// Settings
require('dotenv').config();

app.set('port', process.env.PORT || 3500);

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor');
});

module.exports = app;
