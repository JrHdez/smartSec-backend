const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');
const logger = require('morgan'); //Error handler
require('dotenv').config();

//DB Config
const { dbConnection } = require('./config/config');
dbConnection();

//App de express
const app = express();

// Lectura y parseo del Body, morgan para logs
app.use(logger('dev'))
app.use(express.json());



//NOde server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')


//Path publico
const publiPath = path.resolve( __dirname, 'public' );
app.use(express.static(publiPath))

//Rutas
app.use('/api/login',require('./routes/auth'));

server.listen (process.env.PORT, (err) =>{
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto`, process.env.PORT);
});