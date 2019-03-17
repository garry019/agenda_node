const Router = require('express').Router()
const Eventos = require('./modelos/eventos.model')
const Users = require('./modelos/user.model')
const mongoose = require('mongoose')

Router.post('/login', function(req, res){
	Users.findOne({name:req.body.user,pass:req.body.pass}, function(err, doc){
		if(err){
    	res.status(500)
    	res.json(err)
    }
    if(doc){
        res.send({
          rpta1: 'Validado',
          rpta2: doc._id
        })
    }else{
      res.send({
        rpta1: 'cancelar'
      })
    }
  });
})

Router.post('/all', function(req, res){
  Eventos.find({userId:req.body.user}, function(err, doc){
		if(err){
    	res.status(500)
    	res.json(err)
    }
    res.json(doc)
  });
})

Router.post('/new', function(req, res){
  let event = new Eventos({
    _id : new mongoose.Types.ObjectId(),
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    userId: mongoose.Types.ObjectId(req.body.userId)
  })
  event.save(function(err,response){
    if(err){
        res.json(`Hubo un error ${err}`)
        console.log(`Hubo un error ${err}`)
    }else{
        res.status(200)
        res.json('Registro exitoso')
        //console.log(`Registro exitoso ${response}`)
    }
  })
})

Router.post('/delete', function(req, res){
  Eventos.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)}, function(err, doc){
		if(err){
    	res.status(500)
    	res.json(err)
    }
    res.send('Se ha borrado el evento ' + doc)
  });
  //console.log(req.body.id);
})

Router.post('/update', function(req, res){
  eventId = mongoose.Types.ObjectId(req.body.id)
  let evento = new Eventos({
                start:req.body.start,
                end:req.body.end
              });
  Eventos.updateOne({_id:eventId},evento,function(error){
  	if(error){
  		res.status(500)
  		res.json(error)
  	}
    res.send("Evento Actualizado")
  })
  //console.log(req.body.start+' '+req.body.end);
})

module.exports = Router
