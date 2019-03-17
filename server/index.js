var bodyParser = require('body-parser'),
    http = require('http'),
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    Routing = require('./rutas.js'),
    session = require('express-session')

const Users = require('./modelos/user.model')

var port    = port = process.env.PORT || 3000,
    app     = express(),
    Server  = http.createServer(app),
    url = 'mongodb://localhost:27017/mibase'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public'))
app.use('/', Routing)
app.use(session({
    secret: 'cookie_secret',
    name: 'cookie_name',
    store: '', // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

Server.listen(port, function(){
  Users.countDocuments({}, function(err, c) {
    if(c > 0 ){
      console.log('El usuario para el sistema es "Test" y el password es "12345"');
    }else{
      let usuario = new Users({
                      name: 'Test',
                      pass: '12345',
                      email: 'test@test.com'
                    });
      usuario.save(function(err,response){
        if(err){
            console.log(`Hubo un error ${err}`)
        }else{
            console.log(`Registro exitoso del nuevo usuario ${response}`)
        }
      })
    }
  });

  // Poner un mensaje en la consola
  console.log("Servidor funcionando en el puerto " + port)
});
