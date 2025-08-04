const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doorSchema = new Schema({
  id: String,
  name: String,
  frameImage: String,
  assets: {
    pronouns: String,
    description: String,
    textGradColors: {primary: String, secondary: String},
    bgGradColors: {primary: String, secondary: String}
  }
});

module.exports = mongoose.model('Door', doorSchema, "Rooms");