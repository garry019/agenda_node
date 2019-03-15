const MongoClient = require('mongodb')
const Router = require('express').Router()
var url = 'mongodb://localhost:27017'

Router.post('/login', function(req, res){
  MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err)console.log('Conexion establecida con la base de datos');
    var db = client.db('mibase');
    db.collection('usuarios').find({cedula:req.body.user, pass:req.body.pass}).toArray((error, documents)=>{
      if(error)console.log(error)
      if(documents[0].cedula == req.body.user && documents[0].pass == req.body.pass){
        //console.log(documents);
        let respuesta = {
          rpta1: 'Validado',
          rpta2: documents[0]._id
        }
        res.json(respuesta)
      }
      //console.log(req.body.user + ' ' + req.body.pass);
    });
    client.close();
  });
})

Router.post('/all', function(req, res){
  MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err)console.log('Conexion establecida con la base de datos');
    var db = client.db('mibase');
    db.collection('eventos').find({userId:req.body.user}).toArray((error, documents)=>{
      if(error)console.log(error)
      //console.log(documents.length);
      res.json(documents)
      //console.log(req.body.user + ' ' + req.body.pass);
    });
    client.close();
  });
})

Router.post('/nuevoUsuario', function(req, res){
  MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err)console.log('Conexion establecida con la base de datos');
    var db = client.db('mibase');
    db.collection('usuarios').insertMany([{cedula:req.body.cedula, nombre:req.body.nombre, pass:req.body.pass, pais:req.body.pais}]);
    res.json('Creado');
    client.close();
  });
})

Router.post('/new', function(req, res){
  MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err)console.log('Conexion establecida con la base de datos');
    var db = client.db('mibase');
    var inc = db.collection('counters').findOneAndUpdate({_id:"eventoid"},{$inc:{seq:1}});
    db.collection('eventos').insertMany([{id:"",title:req.body.title, start:req.body.start, end:req.body.end, userId: req.body.userId}]);
    console.log(inc.seq);
    res.json(req.body);
    client.close();
  });
})

Router.post('/delete', function(req, res){
  MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err)console.log('Conexion establecida con la base de datos');
    var db = client.db('mibase');
    let eventoId = req.body.id;
    db.collection('eventos').deleteOne({});
    res.json(req.body.id);
    client.close();
  });
})

module.exports = Router
