var express = require('express');
var pill = require('../models/pill');

var imp_request = require('../imp_request');
var router = express.Router();

router.post('/:device_token/:pill_name', function(req, res, next) {
  var device_token = req.params.device_token;
  var pill_name = req.params.pill_name;

  pill.add_pill(device_token, pill_name).then(function(result) {
    // Add pill to global pill collection
    pill.add_to_pill_collection(pill_name);
    res.json(result);
  }, function (err) {
    next(err);
  });
});

router.get('/', function(req, res, next) {
  pill.all_pills().then(function(result) {
    res.json(result);
  }, function (err) {
    next(err);
  });
});

module.exports = router;