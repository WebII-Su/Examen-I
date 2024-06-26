var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

const app = express();
const port = 5005;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dbPokExamen', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB correctamente'))
  .catch(err => console.error('Error al conectar a MongoDB', err));


// #################################################
//          Importando modelos
// #################################################

require('./models/md_entrenador');
var Trainers = mongoose.model('Trainers');

// #################################################
//          Rutas de la API
// #################################################


//      GET DE TODOS LOS ENTRENADORES

//solicitud en POSTMAN:
// http://localhost:5005/api/getTrainers

router.get('/getTrainers', async function (req,res){

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


//      POST PARA ENTRENADORES
//solicitud en POSTMAN:
// http://localhost:5005/api/addTrainer


//json  de ejemplo:

//{
//    "nombre" : "Kevin 2.0",
//    "apellidos" : "Cordoba Rivera",
//    "sexo" : "Macho peluo",
//    "residencia" : "Baron City",
//    "foto_Url" : "xdd"
//}
router.post('/addTrainer', function(req, res, next) {
    var newTrainer = req.body;
    var trai = new Trainers();

    trai.nombre = newTrainer.nombre;
    trai.apellidos = newTrainer.apellidos;
    trai.sexo = newTrainer.sexo;
    trai.residencia = newTrainer.residencia;
    trai.foto_Url = newTrainer.foto_Url;

    trai.save().then(()=>{
        var salida = {         
            status_code:201,
            status_message: 'Data was created',
            data: trai
        };
        res.set('Content-Type', 'application/json').status(201).send(salida);
    }).catch(next);
});


app.use('/api', router);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });


