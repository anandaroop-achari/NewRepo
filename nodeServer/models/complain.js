var mongoose = require('mongoose');
var moment = require('moment');
var complainSchema = new mongoose.Schema({
  complainId: String,
  title: String,
  email : String,
  status: String,
  note: String,
  madeBy: String,
  assignedTo: String,
  updated_at: { type: Number, default: moment.utc().valueOf()},
});

module.exports = mongoose.model('Complain', complainSchema);