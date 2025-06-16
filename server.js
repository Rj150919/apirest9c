const CONFIG = require('./app/config/configuracion');
const app = require('./app/app');

app.listen(CONFIG.PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${CONFIG.PORT}`);
});