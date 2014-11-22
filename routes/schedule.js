var express = require('express');
var schedule = require('../models/schedule');
var router = express.Router();

router.get('/:device_token', function(req, res, next) {
  console.log(req.params);
  var device_token = req.params.device_token;
  var box = req.body.box;
  var timestamps = req.body.timestamps;

  schedule.create_schedule().then(function() {
    res.json(req.params);
  });

});

module.exports = router;
