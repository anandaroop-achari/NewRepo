var mongoose = require('mongoose');
var complain = require('../models/complain.js');
var UserSchema = new mongoose.Schema({
  userId : String,
  passWord: String,
  name: String,
  email: String,
  admin: Boolean,
  rating: {type : Number, default : 0},
  note: String,
  complains : { type: [complain], default: []},
});

module.exports = mongoose.model('User', UserSchema);