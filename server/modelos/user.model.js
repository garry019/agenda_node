const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  _Id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  pass: { type: String, required: true},
  email: { type: String, required: true},
});

let connection = mongoose.createConnection('mongodb://localhost:27017/mibase',{useNewUrlParser: true});
let User = connection.model('usuarios', UserSchema)
module.exports = User;
