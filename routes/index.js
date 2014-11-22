var express = require('express');
var notifications = require('./notifications');
var users = require('./users');
var router = express.Router();

router.use('/notification', notifications);
router.use('/user', users);
router.use('/schedule', notifications);

module.exports = router;
