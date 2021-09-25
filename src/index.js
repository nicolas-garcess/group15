const app = require('./server');

const PORT = app.get('port');

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
