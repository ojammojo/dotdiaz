var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: '.Diaz' });
  res.sendFile('index.html');
});

module.exports = router;
