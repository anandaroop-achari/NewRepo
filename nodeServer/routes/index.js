/* GET home page. */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});
router.get('/userlist', function(req, res) {
    var collection = req.db.get('usercollection');
    var res1 = collection.find();
    console.log(res1);
    res.send(res1);
});
module.exports = router;

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };
