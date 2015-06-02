var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Staff = require('../models/staff.js');
/* GET users listing. */
var setCors = function(res){
	res.header('Access-Control-Allow-Origin', '*');
  	res.header ('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
};
router.get('/', function(req, res, next) {
  User.find(function(err, users){
  	if(err) return next(err);
  	setCors(res);
  	res.json(users);
  })
});
router.post('/', function(req, res, next){
	console.log(req.body);
	User.create(req.body, function(err, post){
	if(err) return next(err);
  	res.json(post);
	})
});
router.post('/authentication', function(req, res, next){
	console.log(req.body);
	User.find({'userId' : req.body.username, 'passWord':req.body.password}, function(err, post){
	if(err) return next(err);
	//setCors(res);
  	res.json(post);
	})
});
router.post('/update', function(req, res, next){
  console.log(req.body);
  User.findOneAndUpdate({'_id' : req.body._id}, req.body, function(err, post){
  if(err) return next(err);
 
    console.log('successfully updated!');
    res.json(post);
  })
});
router.post('/staff', function(req, res, next){
	console.log(req.body);
	Staff.create(req.body, function(err, post){
		if(err) return next(err);
		res.json(post);
	});
});
router.get('/getStaff', function(req, res, next) {
  Staff.find(function(err, staffs){
  	if(err) return next(err);
  	res.json(staffs);
  })
});
module.exports = router;
