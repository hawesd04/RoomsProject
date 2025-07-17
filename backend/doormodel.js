const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doorSchema = new Schema({
  id: String,
  name: String,
  frameImage: String
});

module.exports = mongoose.model('Door', doorSchema, "Rooms");