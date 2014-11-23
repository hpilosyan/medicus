var express = require('express');
var history = require('../models/history');

var router = express.Router();

router.get('/', function(req, res, next) {
  history.get_history().then(function(result) {
    res.json(result);
  }, function (err) {
    next(err);
  });
});

module.exports = router;