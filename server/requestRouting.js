var express = require('express')
var path = require('path')
var router = express.Router()

var viewsPath = path.join(__dirname, '../client/')

router.get('/users', function(req, res){
  res.sendFile(viewsPath + 'users.html')
})

router.all('/*', function(req, res){
  //res.send('No se encontro el recurso solicitado')
  res.sendFile(viewsPath + 'index.html')
})

module.exports = router
