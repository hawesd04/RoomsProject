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
    bgGradColors: {primary: String, secondary: String},
    useHTML: Boolean,
    renderSnow: Boolean,
    customHTML: String,
    useBGMusic: Boolean,
    bgMusicUrl: String,
    musicName: String,
    musicArtist: String,
    musicImg: String,
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