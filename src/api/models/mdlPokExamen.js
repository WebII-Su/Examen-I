import mongoose from 'mongoose';

var schEntrenador = new mongoose.Schema({
	nombre : {type: String, required:[true, 'This field is required']},
	apellidos: {type: String, required:[true, 'This field is required']},
	sexo: {type: String, required:[true, 'This field is required']},
	residencia: {type: String, required:[true, 'This field is required']},
	foto_Url: {type: String, required:[true, 'This field is required']}	
});

mongoose.model('Trainers', schEntrenador);