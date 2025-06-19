const config = require('./configuracion');
const mongoose = require('mongoose');

module.exports = {
    connection: null,
    conect: () => {
        if (this.connection) return this.connection;
        return mongoose.connect(config.DB)
        .then(conn => {
            this.connection =conn
            console.log('Conexión exitosa a la base de datos');
        })
        .catch(e => {
            console.log(`Error al conectar a la base de datos: ${e}`);
        });
    }
}