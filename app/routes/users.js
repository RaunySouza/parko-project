'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var test = new User({name: 'Manoel Amaro'});
  test.save(function (err) {
    res.send(test);
  });
});

module.exports = router;
