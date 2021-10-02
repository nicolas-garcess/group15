const express = require('express');

const app = express();

// Settings
app.set('port', process.env.PORT || 3500);

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor');
});

module.exports = app;
