var http = require('http')
var express = require('express')
var routing = require('./requestRouting.js')
var path = require('path');


var PORT = 3000
var app = express()
app.use(routing)
var publicPath = path.resolve(__dirname, 'client');
app.use(express.static(publicPath));
var Server = http.createServer(app)
Server.listen(PORT, function(){
  // Poner un mensaje en la consola
  console.log("Servidor funcionando en el puerto " + PORT)
});
