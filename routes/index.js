var express = require('express');
var notifications = require('./notifications');
var users = require('./users');
var schedule = require('./schedule');
var pills = require('./pills');
var router = express.Router();

router.use('/notification', notifications);
router.use('/user', users);
router.use('/schedule', schedule);
router.use('/pill', pills);

module.exports = router;
