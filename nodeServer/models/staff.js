var mongoose = require('mongoose');
var complain = require('../models/complain.js');
var StaffSchema = new mongoose.Schema({
  staffId : String,
  name: String,
  completed: Boolean,
  note: String,
  complains : { type: [complain], default: []}
});

module.exports = mongoose.model('Staff', StaffSchema);