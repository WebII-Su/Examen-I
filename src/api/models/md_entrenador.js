var mongoose = require('mongoose');

const schEntrenador = new mongoose.Schema({
	nombre : {type: String, required: true},
	apellidos: {type: String, required:true },
	sexo: {type: String, required: true},
	residencia: {type: String, required: true},
	foto_Url: {type: String, required: true}	
});

mongoose.model('Trainers', schEntrenador);
