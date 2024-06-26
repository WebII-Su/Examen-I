var mongoose = require('mongoose');

const schEquipos = new mongoose.Schema({
	nombreEquipo : {type: String, required: true},
	entrenadorEncargado: {type: String, required:true },
	urlFoto_entrenador: {type: String, required:true },
	pkmon_1: {type: String, required:true },
	pkmon_2: {type: String, required:false },
	pkmon_3: {type: String, required:false },
	pkmon_4: {type: String, required:false },
	pkmon_5: {type: String, required:false },
	pkmon_6: {type: String, required:false }
});

mongoose.model('Teams', schEquipos);


