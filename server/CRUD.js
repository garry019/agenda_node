module.exports.insertarRegistro = function(db, callback){
  db.collection('usuarios').insertMany([
    {cedula: "80196947", nombre:"Gabriel Calderon", pass: "12345", pais: "Colombia"}
  ]);
}

module.exports.eliminarRegistro = function(db, callback){
  db.collection('usuarios').deleteMany();
  console.log('Se han eliminado los registros');
}

module.exports.consultarRegistro = function(db, callback){
  db.collection('usuarios').find().toArray((error, documents)=>{
    if(error)console.log(error)
    console.log(documents)
  });
  console.log('Se han consultado todos los registros');
}

module.exports.actualizarRegistro = function(db, callback){
  db.collection('usuarios').updateMany({pais: "xxxxxx"}, {$set: {pais: "Desconocido"}});
  console.log('Se han actualizado los registros con el pais xxxxxx');
}
