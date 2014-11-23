var express = require('express');
var schedule = require('../models/schedule');
var history = require('../models/history');

var imp_request = require('../imp_request');
var router = express.Router();

router.post('/:device_token', function(req, res, next) {
  var device_token = req.params.device_token;

  var new_schedule = req.body;

  schedule.create_schedule(device_token, new_schedule).then(function(result) {
    // Send schedule to Imp client
    imp_request.send_schedule(device_token).then(function() {
      res.json(result);
    }, function(err) {
      next(new Error("Can't access device!"));
    });

    // Add to history
    history.add_history_item(new_schedule);
  });
});

router.get('/:device_token', function(req, res, next) {
  var device_token = req.params.device_token;

  schedule.get_schedule(device_token).then(function(schedule) {
    res.json(schedule);
  });
});

module.exports = router;
