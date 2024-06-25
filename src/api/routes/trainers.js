var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Trainers = mongoose.model('Trainers');

//aqui deben salir todos (menu)
router.get('/', async function (req,res){

    try{
        const trainers = await Trainers.find({});

        if (trainers.length === 0) {
            return res.status(200).json({
                status_code: 200,
                status_message: 'Ok',
                data: {'trainers': 'List is empty'}
            });
        }
        res.status(200).json({
            status_code: 200,
            status_message: 'Ok',
            data: trainers
        }) 

    } catch (err) {
        res.status(500).json({
            status_code: 500,
            status_message: 'not okay',
            error: err.message
        })
    }

});

//(aca debería poder agregarlos xdd)
router.post('/', function(req, res, next) {
    var newTrainer = req.body;
    var trai = new Trainers();

    trai.nombre = newTrainer.nombre;
    trai.apellidos = newTrainer.apellidos;
    trai.sexo = newTrainer.sexo;
    trai.residencia = newTrainer.residencia;
    trai.foto_Url = newTrainer.foto_Url;

    trai.save().then(()=>{
        var salida = {          //daba error el no ponerla como var
            status_code:201,
            status_message: 'Data was created',
            data: trai
        };
        res.set('Content-Type', 'application/json').status(201).send(salida);
    }).catch(next);
});
module.exports = router;