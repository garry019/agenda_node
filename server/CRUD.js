module.exports.insertarRegistro = function(db, callback){
  db.collection('usuarios').insertMany([
    {cedula: "00000000", nombre:"Test Test", pass: "12345", pais: "xxxxxx"}
  ]);
}

module.exports.eliminarRegistro = function(db, callback){
  db.collection('usuarios').deleteMany({pais: "xxxxxx"});
  console.log('Se han eliminado los registros con el pais xxxxxx');
}

module.exports.consultarRegistro = function(db, callback){
  db.collection('usuarios').find().toArray((error, documents)=>{
    if(error)console.log(error)
    console.log(documents);
  });
  console.log('Se han consultado todos los registros');
}

module.exports.actualizarRegistro = function(db, callback){
  db.collection('usuarios').updateMany({pais: "xxxxxx"}, {$set: {pais: "Desconocido"}});
  console.log('Se han actualizado los registros con el pais xxxxxx');
}
