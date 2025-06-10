const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});