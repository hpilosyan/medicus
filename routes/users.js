var express = require('express');
var user = require('../models/user');
var router = express.Router();

router.get('/', function(req, res, next) {
  user.get_all().then(function(users) {
    res.json(users);
  }, function(err) {
    next(err);
  });
});

module.exports = router;
