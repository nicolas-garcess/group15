const app = require('./server');

const PORT = app.get('port');
require('./database');

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
