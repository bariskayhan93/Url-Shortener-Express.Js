const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  }
},{ versionKey: false });

module.exports = mongoose.model('Url', UrlSchema);