const mongoose = require('mongoose');

// Conexción a la base de datos
mongoose.connect(process.env.URI_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database is connected'))
  .catch(() => console.log('Something wrong happened with the database connection'));
