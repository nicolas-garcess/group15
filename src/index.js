const app = require('./server');
require('dotenv').config();

const PORT = app.get('port');
require('./database');

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
