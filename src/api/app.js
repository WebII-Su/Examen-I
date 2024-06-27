var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const cors = require('cors'); // Importa la biblioteca CORS

const app = express();
const port = 5005;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/dbPokExamen', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB correctamente'))
  .catch(err => console.error('Error al conectar a MongoDB', err));


// #################################################
//          Importando modelos
// #################################################

require('./models/md_entrenador');
var Trainers = mongoose.model('Trainers');

require('./models/md_equipos');
var Teams = mongoose.model('Teams');


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


// POST para nuevos equipos
// http://localhost:5005/api/addTeam

//ejemplo:

// {
//     "nombreEquipo": "Equipo A",
//     "entrenadorEncargado": "Juan Pérez",
//     "urlFoto_entrenador": "https://example.com/juan_perez.jpg",
//     "pkmon_1": "Charizard",
//     "pkmon_2": "Blastoise",
//     "pkmon_4": "Venusaur",
//     "pkmon_6": "Pikachu"
// }

router.post('/addTeam', function(req, res, next) {
    var newTeam = req.body;
    var team = new Teams();

    // Asignación de campos requeridos
    team.nombreEquipo = newTeam.nombreEquipo;
    team.entrenadorEncargado = newTeam.entrenadorEncargado;
    team.urlFoto_entrenador = newTeam.urlFoto_entrenador;
    team.pkmon_1 = newTeam.pkmon_1;

    var poke = 'pkmon_';
    for (let i = 2; i <= 6; i++) {
        var aux = poke + i;
        if (aux in newTeam) {
            team[aux] = newTeam[aux];
        } else {
            team[aux] = 'null';
        }
    }

    team.save().then(() => {
        var salida = {
            status_code: 201,
            status_message: 'Equipo creado exitosamente',
            data: team
        };
        res.status(201).json(salida);
    }).catch(err => {
        console.error('Error al guardar el equipo:', err);
        var salida = {
            status_code: 500,
            status_message: 'Error interno del servidor',
            error: err.message 
        };
        res.status(500).json(salida);
    });
});

// GET para obtener todos los equipos
// http://localhost:5005/api/getTeam
router.get('/getTeam', async function(req, res) {
    try {
        const teams = await Teams.find({});

        if (teams.length === 0) {
            return res.status(200).json({
                status_code: 200,
                status_message: 'Ok',
                data: { teams: 'List is empty' }
            });
        }

        res.status(200).json({
            status_code: 200,
            status_message: 'Ok',
            data: teams
        });
    } catch (err) {
        console.error('Error al obtener los equipos:', err);
        res.status(500).json({
            status_code: 500,
            status_message: 'Error interno del servidor al obtener los equipos',
            error: err.message
        });
    }
});




app.use('/api', router);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


