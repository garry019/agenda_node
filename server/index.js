var bodyParser = require('body-parser'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    MongoClient = require('mongodb'),
    Routing = require('./rutas.js')

var port    = port = process.env.PORT || 3000,
    app     = express(),
    Server  = http.createServer(app),
    url = 'mongodb://localhost:27017',
    Operaciones = require('./CRUD.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public'))
app.use('/', Routing)

MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
  if (err)console.log('Conexion establecida con la base de datos');

  var db = client.db('mibase');

  // Operaciones.insertarRegistro(db, (error, result) => {
  //   if(error)console.log('Error insertando registros' + error)
  // })
  // Operaciones.eliminarRegistro(db, (error, result) => {
  //   if(error)console.log('Error eliminando registros' + error)
  // })
  // Operaciones.consultarRegistro(db, (error, result) => {
  //   if(error)console.log('Error consultando registros' + error)
  // })
  //
  // Operaciones.actualizarRegistro(db, (error, result) => {
  //   if(error)console.log('Error actualizando registros' + error)
  // })
  //
  // Operaciones.consultarRegistro(db, (error, result) => {
  //   if(error)console.log('Error consultando registros' + error)
  // })

  client.close();
});

Server.listen(port, function(){
  // Poner un mensaje en la consola
  console.log("Servidor funcionando en el puerto " + port)
});
