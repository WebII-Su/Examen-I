// Load libraries into the environment application
var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Creates application
var app = express();

app.use(bodyParser.json({ type: 'application/json' }));


//conexion
mongoose.connect('mongodb://localhost:27017/',{dbName:'dbPokExamen'});
require('./models/mdlPokExamen');

//Creates each route link
var indexRouter = require('./routes/trainers');

// Create all listener for each route link
app.use('/trainers', indexRouter);


// Execute local API server and create listener on port 5005
var server = app.listen(5005, () => {
    console.log(`Server is listening on port ${server.address().port}`);
});