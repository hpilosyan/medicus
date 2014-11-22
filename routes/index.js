var express = require('express');
var notifications = require('./notifications');
var router = express.Router();

router.use('/notification', notifications);

module.exports = router;
