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
  },
  authentication: {
    hash: String
  },
  roomConfig: {
    enabledDivs: [String],
    divData: {
      type: Map,
      of: Schema.Types.Mixed,
      default: new Map([
        ['wide-text', { text: 'Default Wide Text (test)' }]
      ])
    }
  }
});

module.exports = mongoose.model('Door', doorSchema, "Rooms");