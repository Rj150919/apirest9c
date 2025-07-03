const joyasModel = require('../models/joyasModel');

function buscarTodo(req, res) {
    joyasModel.find({})
        .then(joyas => {
            if(joyas.length) {
                return res.status(200).send(joyas);
            }
            return res.status(204).send({mensaje: `No hay nada que mostrar`});
        })
        .catch(e => {
            res.status(404).send({ mensaje: `Error en la consulta ${e}` });
        });

}

module.exports = {
    buscarTodo
}