var express = require('express');
var notifications = require('./notifications');
var users = require('./users');
var router = express.Router();

router.use('/notification', notifications);
router.use('/users', users);

module.exports = router;
