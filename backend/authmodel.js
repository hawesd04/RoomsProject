const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
  roomID: String,
  name: String,
  hash: String
});

module.exports = mongoose.model('Auth', authSchema, "Authentication");