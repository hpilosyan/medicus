var express = require('express');
var user = require('../models/user');
var router = express.Router();

router.get('/', function(req, res, next) {
  user.get_user_with_devices().then(function(user) {
    res.json(user);
  }, function(err) {
    next(err);
  });
});

module.exports = router;
