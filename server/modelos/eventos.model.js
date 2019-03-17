const mongoose = require('mongoose')
const Schema = mongoose.Schema

let EventSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {type: String, required: true },
  start: {type: String, required: true},
  end: {type: String},
  userId: {type: mongoose.Schema.ObjectId, ref: "User" , required: true}
})

let connection = mongoose.createConnection('mongodb://localhost:27017/mibase',{useNewUrlParser: true});
let Event = connection.model('eventos', EventSchema)

module.exports = Event;
