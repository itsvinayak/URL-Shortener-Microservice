const mongoose = require('mongoose');


const urlsSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Url', urlsSchema);