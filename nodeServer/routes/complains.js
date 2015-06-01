var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var Complain = require('../models/complain.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  Complain.find(function(err, complains){
  	if(err) return next(err);
  	res.json(complains);
  })
});
router.post('/', function(req, res, next){
	console.log(req.body);
  req.body.updated_at = moment.utc().valueOf();
  req.body.status = 'new';
	Complain.create(req.body, function(err, post){
	if(err) return next(err);
  	res.json(post);
	})
});
router.post('/update', function(req, res, next){
  console.log(req.body);
  req.body.updated_at = moment.utc().valueOf();
  Complain.findOneAndUpdate({'_id' : req.body._id}, req.body, function(err, post){
  if(err) return next(err);
 
    console.log('successfully updated!');
    res.json(post);
  })
});
router.get('/:userId', function(req, res, next){
	Complain.find({'madeBy' : userId}, function(err, complains){
  	if(err) return next(err);
  	res.json(complains);
  })
});
module.exports = router;