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

function agregarjoya(req,res) {
    new joyasModel(req.body)
        .save()
        .then(info => {
            return res.status(200).send({mensaje: `La información se guardo con éxito`, info});
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al agregar la joya ${e}`});
        });
}

async function buscarJoya(req,res,next) {
    if (!req.body)req.body={}
    var consulta = {}
    consulta[req.params.key] = req.params.value
    await joyasModel.find(consulta)
    .then(joyas => {
        if (!joyas.length) return next();
        req.body.joyas = joyas
            
        return next();
    })
    .catch (e => {
        req.body.e = e;
        return next()
    })
}

function mostrarJoya(req,res) {
    if (req.body.e) return res.status(404).send({mensaje:`error al buscar la información`})
    if (!req.body.joyas) return res.status(204).send({mensaje:`no hay nada que mostrar`})
    let joyas = req.body.joyas
    return res.status(200).send({joyas})
    
}

function eliminarJoya(req,res){
    var joya = {}
    joyas = req.body.joyas
    joyasModel.deleteOne(joyas[0])
    .then(info => {
        return res.status(200).send({mensaje: "La información se elimino con éxito"});
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al eliminar la joya",e});
    });
    }

    function actualizarJoya(req, res) {
        var joyas = {}
        joyas = req.body.joyas
        joyasModel.updateOne(joyas[0],req.body)
        .then(info => {
            return res.status(200).send({mensaje: "La información se actualizo con éxito"});
        })
        .catch(e => {
            return res.status(404).send({ mensaje: "Error al actualizar la joya",e});
        });
    }


module.exports = {
    buscarTodo,
    agregarjoya,
    buscarJoya,
    mostrarJoya,
    eliminarJoya,
    actualizarJoya
}