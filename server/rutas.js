const MongoClient = require('mongodb')
const Router = require('express').Router()
var url = 'mongodb://localhost:27017'

Router.get('/login', function(req, res){
  MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
    if (err)console.log('Conexion establecida con la base de datos');

    var db = client.db('mibase');
    db.collection('usuarios').find().toArray((error, documents)=>{
      if(error)console.log(error)
      console.log(documents)
      res.json(documents)
    });
    client.close();
  });
})


Router.get('/:id', function(req, res){

})

Router.post('/new', function(req, res){

})

Router.post('/delete/:id', function(req, res){

})

module.exports = Router
